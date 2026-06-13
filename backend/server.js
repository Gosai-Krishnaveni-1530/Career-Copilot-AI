const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const PDFDocument = require("pdfkit");
const app = express();

app.use(cors());
app.use(express.json());

// Multer Setup
const upload = multer({
  dest: "uploads/",
});

// Home Route
app.get("/", (req, res) => {
  res.send("CareerCopilot AI Running");
});

// Ollama Test Route
app.get("/test", async (req, res) => {
  try {
    const response = await fetch(
      "http://127.0.0.1:11434/api/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model:  "llama3.2",
          messages: [
            {
              role: "user",
              content: "Say hello in one sentence.",
            },
          ],
          stream: false,
        }),
      }
    );

    const data = await response.json();

    res.json({
      success: true,
      response: data.message.content,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Resume Upload + ATS Analysis
app.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    console.log("Uploaded File:", req.file.originalname);

    // Read PDF
    const dataBuffer = fs.readFileSync(req.file.path);

    // Extract Text
    const pdfData = await pdfParse(dataBuffer);

    const resumeText = pdfData.text;
     
    console.log("PDF Parsed Successfully");
    const prompt = `
Analyze this career document.

Return ONLY valid JSON.

{
  "atsScore": number,
  "jobReadiness": string,
  "strengths": string[],
  "weaknesses": string[],
  "currentSkills": string[],
  "missingSkills": string[],
  "recommendedRoles": [
    {
      "role": string,
      "match": number
    }
  ],
  "learningRoadmap": string[],
  "suggestions": string[]
}

Rules:

- ATS score between 0 and 100
- jobReadiness must be Low, Medium, or High
- Extract current skills from the document
- Identify missing industry-relevant skills
- Generate realistic weaknesses
- Recommend entry-level or early-career roles only
- Do NOT recommend senior, lead, principal, architect, or manager roles
- For each role provide a match percentage
- Generate a learning roadmap based on missing skills
- Return only valid JSON
- Only recommend roles directly aligned with the candidate's demonstrated skills and projects.

Avoid recommending DevOps, Security, Cloud, Management, or Senior positions unless strong evidence exists in the document.
IMPORTANT:

Return STRICT JSON.

Do NOT use:

...spread operators



comments

// comments

/* comments */

Do not reference variables.

Every array must contain actual string values.

Return ONLY valid JSON.
Return a JSON object.

Do NOT wrap the JSON in quotes.

BAD:
"{...}"

GOOD:
{...}
Document:

${resumeText.substring(0, 12000)}
`;
    const ollamaResponse = await fetch(
      "http://127.0.0.1:11434/api/chat",
      {
        method: "POST",
        signal: AbortSignal.timeout(180000),
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3.2",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          stream: false,
        }),
      }
    );

    const result = await ollamaResponse.json();

    console.log("========== RAW RESPONSE ==========");
    console.log(result.message.content);
    console.log("=================================");
const rawResponse = result.message.content;

let cleaned = rawResponse
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

if (
  cleaned.startsWith('"{') &&
  cleaned.endsWith('}"')
) {
  cleaned = cleaned.slice(1, -1);
}

cleaned = cleaned
  .replace(/\\"/g, '"')
  .trim();

let analysis;

try {
  analysis = JSON.parse(cleaned);

  console.log("JSON PARSED SUCCESSFULLY");
} catch (error) {
  console.log("JSON PARSE FAILED");
  console.log(cleaned);

  analysis = {
    atsScore: 0,
    jobReadiness: "Unknown",
    strengths: [],
    weaknesses: [],
    currentSkills: [],
    missingSkills: [],
    recommendedRoles: [],
    learningRoadmap: [],
    suggestions: [],
    rawResponse: cleaned,
  };
}
    res.status(200).json({
      success: true,
      pages: pdfData.numpages,
      analysis,
    });
  } catch (error) {
    console.error("ERROR:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
// Resume vs Job Description Match
app.post(
  "/jd-match",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "jobDescription", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const resumeFile = req.files?.resume?.[0];
      const jdFile = req.files?.jobDescription?.[0];

      if (!resumeFile || !jdFile) {
        return res.status(400).json({
          success: false,
          error:
            "Resume and Job Description files are required",
        });
      }

      console.log(
        "Resume File:",
        resumeFile.originalname
      );

      console.log(
        "Job Description File:",
        jdFile.originalname
      );

      // Parse Resume PDF
      const resumeBuffer = fs.readFileSync(
        resumeFile.path
      );

      const resumeData = await pdfParse(
        resumeBuffer
      );

      const resumeText = resumeData.text;

      // Parse Job Description
      let jdText = "";

      if (
        jdFile.mimetype ===
        "text/plain"
      ) {
        jdText = fs.readFileSync(
          jdFile.path,
          "utf8"
        );
      } else {
        const jdBuffer = fs.readFileSync(
          jdFile.path
        );

        const jdData = await pdfParse(
          jdBuffer
        );

        jdText = jdData.text;
      }

      console.log(
        "Resume and JD parsed successfully"
      );

      const prompt = `
Compare this resume against the job description.

Return ONLY valid JSON.

{
  "matchScore": number,
  "missingKeywords": string[],
  "strengths": string[],
  "recommendations": string[]
}

Rules:

- matchScore between 0 and 100
- Identify missing keywords from the job description
- Mention strengths from the resume that align with the job description
- Provide actionable recommendations
- Return STRICT JSON ONLY
- No markdown
- No comments
- No explanations

Resume:
${resumeText.substring(0, 12000)}

Job Description:
${jdText.substring(0, 12000)}
`;

      const ollamaResponse =
        await fetch(
          "http://127.0.0.1:11434/api/chat",
          {
            method: "POST",
            signal:
              AbortSignal.timeout(
                180000
              ),
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              model: "llama3.2",
              messages: [
                {
                  role: "user",
                  content: prompt,
                },
              ],
              stream: false,
            }),
          }
        );

      const result =
        await ollamaResponse.json();

      console.log(
        "========== JD MATCH RAW RESPONSE =========="
      );

      console.log(
        result.message.content
      );

      console.log(
        "==========================================="
      );

      let cleaned =
        result.message.content
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

      if (
        cleaned.startsWith('"{') &&
        cleaned.endsWith('}"')
      ) {
        cleaned =
          cleaned.slice(1, -1);
      }

      cleaned = cleaned.replace(
        /\\"/g,
        '"'
      );

      let analysis;

      try {
        analysis =
          JSON.parse(cleaned);

        console.log(
          "JD MATCH JSON PARSED SUCCESSFULLY"
        );
      } catch (error) {
        console.log(
          "JD MATCH JSON PARSE FAILED"
        );

        console.log(cleaned);

        return res.status(500).json({
          success: false,
          error:
            "Invalid AI response format",
        });
      }

      res.status(200).json({
        success: true,
        analysis,
      });
    } catch (error) {
      console.error(
        "JD MATCH ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

app.post("/career-coach", async (req, res) => {
  try {
    const { question, analysis, jdAnalysis, model, coachLength,
  coachStyle, } = req.body;

    const prompt = `
You are CareerCopilot AI.

Resume Analysis:
${JSON.stringify(analysis)}

JD Match Analysis:
${JSON.stringify(jdAnalysis)}

Question:
${question}

Coach Style:
${coachStyle}

Response Length:
${coachLength} 

IMPORTANT RULES:

1. Respond in PLAIN TEXT only.
2. NEVER use:
   - **
   - *
   - #
   - markdown
   - bold formatting
3. Use only:
   - numbered lists
   - bullet points using •

4. Keep sections exactly in this format:

CAREER ADVICE

Current Strengths:
• Point 1
• Point 2

Skills To Improve:
• Point 1
• Point 2

Recommended Projects:
1. Project Name
   Description

2. Project Name
   Description

Recommended Certifications:
• Certification 1
• Certification 2

Next Steps:
1. Step 1
2. Step 2
3. Step 3



If JD Match Analysis exists:

- Explain match score
- Explain missing keywords
- Recommend improvements
- Suggest projects for the target role
- Suggest certifications
- Prioritize missing skills

Return only the response.
`;

    const ollamaResponse = await fetch(
      "http://127.0.0.1:11434/api/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model || "phi3",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          stream: false,
        }),
      }
    );

    const data = await ollamaResponse.json();

    const cleanResponse = data.message.content
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/#/g, "");

    res.json({
      success: true,
      answer: cleanResponse,
    });
  } catch (error) {
    console.error("CAREER COACH ERROR:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


app.post("/generate-report", (req, res) => {
  try {
    const analysis = req.body;

    const doc = new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=CareerCopilot_Report.pdf"
    );

    doc.pipe(res);

    doc
      .fontSize(24)
      .text("CareerCopilot AI Report");

    doc.moveDown();

    doc
      .fontSize(16)
      .text(
        `ATS Score: ${analysis.atsScore}`
      );

    doc.text(
      `Job Readiness: ${analysis.jobReadiness}`
    );

    doc.moveDown();

    doc
      .fontSize(18)
      .text("Strengths");

    analysis.strengths?.forEach(
      (item) => {
        doc.text(`• ${item}`);
      }
    );

    doc.moveDown();

    doc
      .fontSize(18)
      .text("Weaknesses");

    analysis.weaknesses?.forEach(
      (item) => {
        doc.text(`• ${item}`);
      }
    );

    doc.moveDown();

    doc
      .fontSize(18)
      .text("Current Skills");

    analysis.currentSkills?.forEach(
      (item) => {
        doc.text(`• ${item}`);
      }
    );

    doc.moveDown();

    doc
      .fontSize(18)
      .text("Missing Skills");

    analysis.missingSkills?.forEach(
      (item) => {
        doc.text(`• ${item}`);
      }
    );

    doc.moveDown();

    doc
      .fontSize(18)
      .text("Recommended Roles");

    analysis.recommendedRoles?.forEach(
      (item) => {
        doc.text(
          `• ${item.role} (${item.match}%)`
        );
      }
    );

    doc.moveDown();

    doc
      .fontSize(18)
      .text("Learning Roadmap");

    analysis.learningRoadmap?.forEach(
      (item) => {
        doc.text(`• ${item}`);
      }
    );

    doc.moveDown();

    doc
      .fontSize(18)
      .text("Suggestions");

    analysis.suggestions?.forEach(
      (item) => {
        doc.text(`• ${item}`);
      }
    );

    doc.end();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
// Start Server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
