import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import dns from "node:dns";
import https from "node:https";
import { generateDynamicDomainSchema, ensureRichVisualComponents } from "./src/utils/schemaSynthesizer";

if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder("ipv4first");
}

dotenv.config();

function postOpenRouterHttps(bodyPayload: any, apiKey: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(bodyPayload);
    const options = {
      hostname: "openrouter.ai",
      port: 443,
      path: "/api/v1/chat/completions",
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
        "HTTP-Referer": "http://localhost:3001",
        "X-Title": "Generative UI Studio"
      },
      family: 4,
      timeout: 45000
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error(`Failed to parse response JSON: ${data.slice(0, 100)}`));
          }
        } else {
          reject(new Error(`Status ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on("error", (e) => reject(e));
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("OpenRouter HTTPS request timed out (45s)"));
    });

    req.write(postData);
    req.end();
  });
}

function repairTruncatedJson(rawText: string): any {
  if (!rawText) throw new Error("Empty text received from model");

  // 1. Strip markdown fences if present
  let clean = rawText
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/, "")
    .trim();

  // 2. Locate boundaries of JSON object
  const firstBrace = clean.indexOf("{");
  const lastBrace = clean.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    clean = clean.slice(firstBrace, lastBrace + 1);
  } else if (firstBrace !== -1) {
    clean = clean.slice(firstBrace);
  } else {
    throw new Error("No JSON object start '{' found in model response");
  }

  // 3. Try standard JSON.parse first
  try {
    return JSON.parse(clean);
  } catch (e1) {}

  // 4. Sanitize control characters (raw newlines/tabs inside strings)
  let sanitized = clean.replace(/[\u0000-\u001F]+/g, (match) => {
    if (match === "\n" || match === "\r") return " ";
    if (match === "\t") return " ";
    return "";
  });

  try {
    return JSON.parse(sanitized);
  } catch (e2) {}

  // 5. Reconstruct and close missing quotes & brackets
  let inString = false;
  let isEscaped = false;
  let stack: string[] = [];
  let repaired = "";

  for (let i = 0; i < sanitized.length; i++) {
    const char = sanitized[i];
    if (isEscaped) {
      repaired += char;
      isEscaped = false;
      continue;
    }
    if (char === "\\") {
      repaired += char;
      isEscaped = true;
      continue;
    }
    if (char === '"') {
      inString = !inString;
      repaired += char;
      continue;
    }
    if (inString) {
      if (char === "\n" || char === "\r") {
        repaired += " ";
      } else {
        repaired += char;
      }
    } else {
      repaired += char;
      if (char === "{" || char === "[") {
        stack.push(char === "{" ? "}" : "]");
      } else if (char === "}" || char === "]") {
        if (stack.length > 0 && stack[stack.length - 1] === char) {
          stack.pop();
        }
      }
    }
  }

  if (inString) {
    repaired += '"';
  }

  repaired = repaired.replace(/,\s*$/, "").replace(/:\s*$/, ": null");

  while (stack.length > 0) {
    const closeChar = stack.pop();
    repaired = repaired.replace(/,\s*$/, "") + closeChar;
  }

  return JSON.parse(repaired);
}

const app = express();
const PORT = parseInt(process.env.PORT || "3001", 10);

app.use(express.json({ limit: "10mb" }));

// Helper to identify empty or dummy placeholder keys
const isDummyKey = (key: string | undefined): boolean => {
  if (!key) return true;
  const k = key.trim().replace(/['"]/g, ""); // remove possible quotes
  return (
    k === "" ||
    k === "YOUR_GEMINI_API_KEY_HERE" ||
    k === "MY_GEMINI_API_KEY" ||
    k === "YOUR_OPENROUTER_API_KEY_HERE" ||
    k.includes("YOUR_") ||
    k.includes("INSERT_")
  );
};

// Server-side Gemini AI setup
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (isDummyKey(apiKey)) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Endpoint: Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Enhanced System prompt instructing Gemini to return ultra-high quality Generative UI JSON schemas
const GENERATIVE_UI_SYSTEM_PROMPT = `You are a world-class Principal UI/UX Architect and Generative Interface Systems Designer.
Your task is to take a user's natural language request and synthesize a completely UNIQUE, production-grade, visually stunning UI layout schema in JSON.

DYNAMIC FORMAT & CREATIVE STYLE DIRECTIVES:
1. ALWAYS INCLUDE HIGH-QUALITY PHOTOGRAPHY & RICH IMAGE COMPONENTS IN EVERY SCHEMA:
   - Make EVERY UI look visually stunning, vibrant, photo-rich, and extremely pretty!
   - STRICT USER DIRECTIVE: DO NOT GENERATE CHARTS, LINE GRAPHS, BAR CHARTS, OR PIE CHARTS. Use visual card grids, photo hero banners, category pill grids, item menus, kanban boards, and tables instead.
   - Every single generated schema SHOULD include rich image-based components:
     a) Top Hero Banner Image ("type": "image") with high-res Unsplash photography URL, title, description, and wide aspect ratio.
     b) Circular Category Pill Grid ("type": "food_category_grid") with image URLs and offer text badges (e.g. "50% OFF", "POPULAR", "BESTSELLER", "TOP RATED") for domain categories.
     c) Photography Card Grid ("type": "restaurant_list") with star ratings (e.g. 4.9★), subtext, offer badges ("FLAT 20% OFF", "FREE EXPRESS DELIVERY"), pricing, and high-res photography cards.
     d) Bestseller Item Cards ("type": "food_menu") with item/product photography, prices, bestseller tags, and action buttons ("+ ADD", "+ BUY", "+ ENROLL", "+ DEPOSIT").

2. bespoke design & tailored domain hierarchy:
   - Every request MUST have its own custom color palette, domain-tailored visual hierarchy, and bespoke component ordering.
   - E-Commerce & Retail: Hero Photography Banners, Product Category Pills, Featured Product Cards, and Bestsellers Menu.
   - Consumer & Food Apps: Photography Hero Banners, Cuisine Category Pills, Restaurant Cards, and Menu Bestsellers.
   - Healthcare & Telemedicine: Care Banner Images, Medical Specialty Category Pills, Physician Cards, and Patient Records Table.
   - Education & Learning: Academy Banner Images, Subject Category Pills, Master Course Cards, and Module Menus.
   - SaaS, Crypto & Finance: Trading Hero Banner Images, Asset Category Pills, Top Asset Cards, KPI Stat Cards, Calculators, and Accounts Tables.

3. TAILORED DOMAIN NAVIGATION ("customNavigation"):
   - Always include a 4-item navigation menu with custom domain-specific labels matching the user's prompt!
   - Example:
     "customNavigation": [
       { "label": "Domain Overview", "icon": "LayoutGrid", "tabId": "dashboard" },
       { "label": "Domain Workspace", "icon": "Layers", "tabId": "operations" },
       { "label": "Analytics & Trends", "icon": "TrendingUp", "tabId": "analytics" },
       { "label": "Settings", "icon": "Settings", "tabId": "settings" }
     ]

4. DISTINCT DASHBOARD VS OPERATIONS LAYOUTS ("layout" & "operationsLayout"):
   - "layout": Executive overview dashboard with hero banners, circular category image grids, photography card grids, KPI metrics, and high-level charts.
   - "operationsLayout": Dedicated execution workspace with data tables, Kanban boards, action lists, alerts, and workflow triggers.

5. THEME & COLOR CREATIVITY:
   - Select accentColor ("emerald", "indigo", "amber", "violet", "rose", "sky", "cyan") and style ("modern", "glassmorphism", "neo-brutalist", "minimalist") tailored to the vibe of the application.

6. ENGAGING ASSISTANT RESPONSE:
   - Include a detailed, enthusiastic, and helpful "assistantMessage" in the JSON explaining the layout rationale, component highlights, and features designed for the user's prompt.

7. STRICT JSON COMPLIANCE:
   - Return raw valid JSON conforming to the schema. Do not wrap in extra commentary or text.`;

function mergeSchemasServer(currentSchema: any, newSchema: any, promptText: string): any {
  if (!currentSchema) return newSchema;
  const merged = JSON.parse(JSON.stringify(currentSchema));
  
  // Retain original template identity & category
  merged.title = currentSchema.title || merged.title;
  merged.category = currentSchema.category || merged.category;
  if (currentSchema.operationsLayout) {
    merged.operationsLayout = currentSchema.operationsLayout;
  }

  // Ensure currentSchema layout is normalized
  if (merged.layout && !Array.isArray(merged.layout)) {
    merged.layout = typeof merged.layout === 'object' ? [merged.layout] : [];
  }
  if (!merged.layout) merged.layout = [];

  // Ensure newSchema layout is normalized
  if (newSchema && newSchema.layout) {
    if (!Array.isArray(newSchema.layout)) {
      newSchema.layout = typeof newSchema.layout === 'object' ? [newSchema.layout] : [];
    }
  }

  if (newSchema && newSchema.metrics && newSchema.metrics.length > 0) {
    const existingMetricIds = new Set((merged.metrics || []).map((m: any) => m.id || m.label));
    const newMetricsToAdd = newSchema.metrics.filter((m: any) => !existingMetricIds.has(m.id || m.label));
    merged.metrics = [...(merged.metrics || []), ...newMetricsToAdd];
  }

  if (newSchema && newSchema.layout && newSchema.layout.length > 0) {
    const promptLower = promptText.toLowerCase();
    const isExplicitReset = promptLower.includes('start over') || promptLower.includes('reset canvas') || promptLower.includes('clear all');
    
    if (isExplicitReset) {
      merged.layout = newSchema.layout;
    } else {
      // Find any newly generated image components and prepend them to hero section
      const newImages: any[] = [];
      newSchema.layout.forEach((newSec: any) => {
        if (!newSec) return;
        (newSec.components || []).forEach((c: any) => {
          if (c && c.type === 'image') {
            newImages.push(c);
          }
        });
      });

      if (newImages.length > 0 && merged.layout.length > 0) {
        const existingImgIds = new Set(
          merged.layout
            .filter((s: any) => s && Array.isArray(s.components))
            .flatMap((s: any) => s.components.filter((c: any) => c && c.type === 'image').map((c: any) => c.id || c.url))
        );
        const imagesToInsert = newImages.filter(img => img && !existingImgIds.has(img.id || img.url));
        if (imagesToInsert.length > 0 && merged.layout[0] && Array.isArray(merged.layout[0].components)) {
          merged.layout[0].components.unshift(...imagesToInsert);
        }
      }

      // Merge other new sections/components without destroying current template format
      newSchema.layout.forEach((newSec: any) => {
        if (!newSec) return;
        const matchingSec = merged.layout.find((s: any) => s && s.title && newSec.title && s.title.toLowerCase() === newSec.title.toLowerCase());
        if (matchingSec) {
          if (!Array.isArray(matchingSec.components)) {
            matchingSec.components = [];
          }
          const existingCompIds = new Set(matchingSec.components.filter((c: any) => c).map((c: any) => c.id));
          (newSec.components || []).forEach((comp: any) => {
            if (comp && !existingCompIds.has(comp.id) && comp.type !== 'image') {
              matchingSec.components.push(comp);
            }
          });
        } else {
          // Filter out redundant top-level layout replacements
          const nonImageComps = (newSec.components || []).filter((c: any) => c && c.type !== 'image');
          if (nonImageComps.length > 0 && merged.layout.length < 5) {
            merged.layout.push({ ...newSec, components: nonImageComps });
          }
        }
      });
    }
  }

  // Operations layout merging
  if (newSchema && newSchema.operationsLayout && newSchema.operationsLayout.length > 0) {
    if (!merged.operationsLayout) merged.operationsLayout = [];
    if (!Array.isArray(merged.operationsLayout)) {
      merged.operationsLayout = typeof merged.operationsLayout === 'object' ? [merged.operationsLayout] : [];
    }
    const newOpsLayout = Array.isArray(newSchema.operationsLayout) ? newSchema.operationsLayout : [newSchema.operationsLayout];
    newOpsLayout.forEach((opsSec: any) => {
      if (opsSec) {
        merged.operationsLayout.push(opsSec);
      }
    });
  }

  merged.description = `${merged.description} • Added refinement: "${promptText}"`;
  if (newSchema && newSchema.assistantMessage) {
    merged.assistantMessage = newSchema.assistantMessage;
  }

  return merged;
}

app.post("/api/generate-ui", async (req, res) => {
  const { prompt, currentSchema, action, theme, model, images } = req.body || {};

  try {
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const ai = getGeminiClient();
    const hasOpenRouterKey = !isDummyKey(process.env.OPENROUTER_API_KEY);

    if (!ai && !hasOpenRouterKey) {
      console.warn("GEMINI_API_KEY and OPENROUTER_API_KEY are missing or placeholders. Using dynamic schema synthesizer.");
      
      const newDomainSchema = generateDynamicDomainSchema(prompt, theme);
      let fallbackSchema = newDomainSchema;
      
      if (action === "refine" && currentSchema) {
        fallbackSchema = mergeSchemasServer(currentSchema, newDomainSchema, prompt);
      }

      return res.json({
        schema: fallbackSchema,
        fallback: true,
        connectionMode: "fallback",
        message: "Gemini API key or OpenRouter API key not found in environment. Using dynamic domain schema synthesizer."
      });
    }

    let userInstruction = "";
    if (action === "refine" && currentSchema) {
      userInstruction = `Modify the existing UI schema based on this user request: "${prompt}".
Existing UI Schema Title: "${currentSchema.title}".
Keep existing layout elements unless explicitly asked to remove them, and add or update requested components/charts/metrics/forms.`;
    } else {
      userInstruction = `Create a brand new Generative UI for this natural language request: "${prompt}". Make it detailed, visually complete, with rich charts, KPI stats, interactive controls, and realistic data.`;
    }

    if (theme) {
      userInstruction += `\nInclude theme preferences: accentColor="${theme.accentColor || 'emerald'}", style="${theme.style || 'modern'}", mode="${theme.mode || 'light'}", fontFamily="${theme.fontFamily || 'Plus Jakarta Sans'}", borderRadius="${theme.borderRadius || 'lg'}".`;
    }

    let modelName = "gemini-3.6-flash";
    if (model) {
      if (model.includes("Pro") || model.includes("pro") || model.includes("Ultra") || model.includes("ultra")) {
        modelName = "gemini-3.1-pro-preview";
      } else {
        modelName = "gemini-3.6-flash";
      }
    }

    let generatedSchema: any = null;

    if (hasOpenRouterKey) {
      const openRouterModels = [
        "google/gemini-flash-1.5",
        "openai/gpt-4o-mini",
        "meta-llama/llama-3.3-70b-instruct",
        "openrouter/auto"
      ];

      let openRouterResponse: any = null;
      let lastOpenRouterErr = "";

      for (const openRouterModel of openRouterModels) {
        console.log(`Calling OpenRouter API (${openRouterModel})...`);
        try {
          const isJsonModeSupported = openRouterModel.includes("google") || openRouterModel.includes("openai") || openRouterModel.includes("gpt");
          
          const bodyPayload: any = {
            model: openRouterModel,
            messages: [
              { role: "system", content: GENERATIVE_UI_SYSTEM_PROMPT },
              { role: "user", content: userInstruction }
            ],
            max_tokens: 2200
          };

          if (isJsonModeSupported) {
            bodyPayload.response_format = { type: "json_object" };
          }

          let openRouterDataResult: any = null;
          try {
            const resObj = await fetch("https://openrouter.ai/api/v1/chat/completions", {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:3001",
                "X-Title": "Generative UI Studio"
              },
              body: JSON.stringify(bodyPayload)
            });

            if (resObj.ok) {
              openRouterDataResult = await resObj.json();
            } else {
              const errText = await resObj.text();
              lastOpenRouterErr = `[Model ${openRouterModel}] Status ${resObj.status}: ${errText}`;
              console.warn(`OpenRouter fetch status error: ${lastOpenRouterErr}`);
            }
          } catch (fetchErr: any) {
            console.warn(`Node fetch failed for ${openRouterModel}, attempting native HTTPS IPv4 request...`);
            try {
              openRouterDataResult = await postOpenRouterHttps(bodyPayload, process.env.OPENROUTER_API_KEY || "");
            } catch (httpsErr: any) {
              lastOpenRouterErr = `[Model ${openRouterModel}] HTTPS error: ${httpsErr?.message || String(httpsErr)}`;
              console.warn(lastOpenRouterErr);
            }
          }

          if (openRouterDataResult && openRouterDataResult.choices?.[0]?.message?.content) {
            const contentText = openRouterDataResult.choices[0].message.content;
            try {
              generatedSchema = repairTruncatedJson(contentText);
              if (generatedSchema && typeof generatedSchema === 'object') {
                break;
              }
            } catch (parseErr: any) {
              console.warn(`JSON repair parse failed for ${openRouterModel}:`, parseErr?.message || parseErr);
            }
          }
        } catch (e: any) {
          lastOpenRouterErr = `[Model ${openRouterModel}] Exception: ${e?.message || String(e)}`;
          console.warn(`OpenRouter model loop exception: ${lastOpenRouterErr}`);
        }
      }

      if (!generatedSchema) {
        throw new Error(`All OpenRouter model attempts failed. ${lastOpenRouterErr}`);
      }
    } else if (ai) {
      console.log(`Calling native Google Gen AI API (${modelName}) with Multimodal Vision...`);
      
      const contentsPayload: any[] = [
        { text: GENERATIVE_UI_SYSTEM_PROMPT },
        { text: userInstruction }
      ];

      if (images && Array.isArray(images) && images.length > 0) {
        images.forEach((base64Str: string) => {
          if (typeof base64Str === 'string' && base64Str.startsWith('data:')) {
            const mimeType = base64Str.match(/^data:(image\/\w+);base64,/)?.[1] || 'image/png';
            const base64Data = base64Str.replace(/^data:image\/\w+;base64,/, '');
            contentsPayload.push({
              inlineData: {
                data: base64Data,
                mimeType: mimeType
              }
            });
          }
        });

        contentsPayload.push({
          text: "CRITICAL VISION ANALYSIS INSTRUCTION: The user provided screenshot/wireframe image(s). Carefully inspect the layout structure, visual hierarchy, color palette, charts, tables, cards, and UI widgets shown in the image(s), and generate a JSON UI schema that accurately reflects the visual design, content, and components shown in the image(s)."
        });
      }

      let response: any = null;
      const candidateModels = Array.from(new Set([
        modelName,
        "gemini-3.1-pro-preview",
        "gemini-3.6-flash",
        "gemini-flash-latest"
      ]));
      let lastErr: any = null;

      for (const candidate of candidateModels) {
        try {
          console.log(`Calling Google Gen AI API model (${candidate})...`);
          response = await ai.models.generateContent({
            model: candidate,
            contents: contentsPayload,
            config: {
              responseMimeType: "application/json",
              maxOutputTokens: 8192
            }
          });
          if (response && response.text) {
            break;
          }
        } catch (err: any) {
          lastErr = err;
          console.warn(`Model ${candidate} failed: ${err?.message || err}. Trying next fallback model...`);
          await new Promise(res => setTimeout(res, 1000));
        }
      }

      if (!response || !response.text) {
        throw lastErr || new Error("All Gemini model candidates failed to return response text.");
      }

      let schemaText = response.text;
      if (!schemaText) {
        throw new Error("No response text received from Gemini");
      }

      schemaText = schemaText.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
      try {
        generatedSchema = JSON.parse(schemaText);
      } catch (parseErr: any) {
        const firstBrace = schemaText.indexOf('{');
        const lastBrace = schemaText.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace > firstBrace) {
          try {
            generatedSchema = JSON.parse(schemaText.slice(firstBrace, lastBrace + 1));
          } catch (e2) {
            console.error("Failed to parse schema JSON. Content length:", schemaText.length);
            console.error("Start of response:", schemaText.substring(0, 200));
            console.error("End of response:", schemaText.substring(schemaText.length - 200));
            throw parseErr;
          }
        } else {
          throw parseErr;
        }
      }
    }

    generatedSchema.id = generatedSchema.id || `gen_${Date.now()}`;
    generatedSchema.generatedPrompt = prompt;

    const cleanAndTrimTitle = (title?: string, fallbackPrompt?: string): string => {
      const target = title || fallbackPrompt || "Custom Application";
      const clean = target
        .replace(/^(build|create|design|generate|make|set up|setup|show me|a|an|the|modern|premium|visually|appealing|mobile|web|ui)\s+/i, '')
        .trim();
      const words = clean.split(/\s+/);
      if (words.length > 5 || clean.length > 40) {
        const shortTitle = words.slice(0, 4).join(' ');
        return shortTitle.charAt(0).toUpperCase() + shortTitle.slice(1) + '...';
      }
      return clean.charAt(0).toUpperCase() + clean.slice(1);
    };

    if (action === "refine" && currentSchema) {
      generatedSchema = mergeSchemasServer(currentSchema, generatedSchema, prompt);
    } else {
      generatedSchema.title = cleanAndTrimTitle(generatedSchema.title, prompt);
    }

    generatedSchema = ensureRichVisualComponents(generatedSchema, prompt);

    return res.json({ 
      schema: generatedSchema, 
      connectionMode: hasOpenRouterKey ? "openrouter" : "gemini" 
    });
  } catch (err: any) {
    console.warn("Gemini API rate limit or request error encountered. Serving dynamic domain schema synthesizer:", err?.message || err);
    const newDomainSchema = generateDynamicDomainSchema(prompt, theme);
    let fallbackSchema = newDomainSchema;
    if (action === "refine" && currentSchema) {
      fallbackSchema = mergeSchemasServer(currentSchema, newDomainSchema, prompt);
    }
    fallbackSchema = ensureRichVisualComponents(fallbackSchema, prompt);
    return res.json({ 
      schema: fallbackSchema, 
      fallback: true, 
      connectionMode: "fallback",
      error: err?.message || String(err)
    });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    try {
      const ai = getGeminiClient();
      if (ai) {
        console.log("Fetching available Gemini models for API key...");
        const response = await ai.models.list();
        console.log("--- Supported Models by your Key ---");
        for await (const m of response) {
          console.log(`  * ${m.name}`);
        }
        console.log("------------------------------------");
      }
    } catch (err: any) {
      console.warn("Could not list models on startup:", err?.message || err);
    }
  });
}

startServer();
