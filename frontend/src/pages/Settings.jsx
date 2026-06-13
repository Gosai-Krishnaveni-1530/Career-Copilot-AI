import { useState, useEffect } from "react";

function Settings() {
  const [name, setName] = useState("");
  const [careerGoal, setCareerGoal] = useState("");
  const [targetRole, setTargetRole] = useState("AI Engineer");
  const [experience, setExperience] = useState("Fresher");

  const [coachLength, setCoachLength] = useState("Detailed");
  const [coachStyle, setCoachStyle] = useState("Professional");
  const [model, setModel] = useState("llama3.2");

  const [theme, setTheme] = useState("dark");
  const [accentColor, setAccentColor] = useState("cyan");

  useEffect(() => {
    const settings =
      JSON.parse(
        localStorage.getItem(
          "careercopilot_settings"
        )
      ) || {};

    setName(settings.name || "");
    setCareerGoal(settings.careerGoal || "");
    setTargetRole(
      settings.targetRole ||
        "AI Engineer"
    );
    setExperience(
      settings.experience ||
        "Fresher"
    );

    setCoachLength(
      settings.coachLength ||
        "Detailed"
    );

    setCoachStyle(
      settings.coachStyle ||
        "Professional"
    );

    setModel(
      settings.model ||
        "llama3.2"
    );

    setTheme(
      settings.theme || "dark"
    );

    setAccentColor(
      settings.accentColor || "cyan"
    );
  }, []);

  const saveSettings = () => {
    localStorage.setItem(
      "careercopilot_settings",
      JSON.stringify({
        name,
        careerGoal,
        targetRole,
        experience,
        coachLength,
        coachStyle,
        model,
        theme,
        accentColor,
      })
    );

    alert("Settings Saved");
  };

  const clearResumeData = () => {
    localStorage.removeItem(
      "analysis"
    );

    alert(
      "Resume Analysis Cleared"
    );
  };

  const clearJDData = () => {
    localStorage.removeItem(
      "jdAnalysis"
    );

    alert("JD Match Cleared");
  };

  const clearCoachChat = () => {
    localStorage.removeItem(
      "coachMessages"
    );

    alert("Coach Chat Cleared");
  };

  const resetEverything = () => {
    localStorage.clear();

    alert(
      "Application Reset Successfully"
    );

    window.location.reload();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white">
        Settings
      </h1>

      {/* Profile Settings */}

      <div className="bg-[#071426] border border-cyan-900 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6">
          Profile Settings
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full bg-slate-800 text-white p-3 rounded-xl"
          />

          <input
            type="text"
            placeholder="Career Goal"
            value={careerGoal}
            onChange={(e) =>
              setCareerGoal(
                e.target.value
              )
            }
            className="w-full bg-slate-800 text-white p-3 rounded-xl"
          />

          <select
            value={targetRole}
            onChange={(e) =>
              setTargetRole(
                e.target.value
              )
            }
            className="w-full bg-slate-800 text-white p-3 rounded-xl"
          >
            <option>
              AI Engineer
            </option>

            <option>
              Data Scientist
            </option>

            <option>
              ML Engineer
            </option>

            <option>
              Full Stack Developer
            </option>
          </select>

          <select
            value={experience}
            onChange={(e) =>
              setExperience(
                e.target.value
              )
            }
            className="w-full bg-slate-800 text-white p-3 rounded-xl"
          >
            <option>
              Student
            </option>

            <option>
              Fresher
            </option>

            <option>
              Experienced
            </option>
          </select>
        </div>
      </div>

      {/* AI Coach Settings */}

      <div className="bg-[#071426] border border-cyan-900 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6">
          AI Coach Settings
        </h2>

        <div className="space-y-4">
          <select
            value={coachLength}
            onChange={(e) =>
              setCoachLength(
                e.target.value
              )
            }
            className="w-full bg-slate-800 text-white p-3 rounded-xl"
          >
            <option>
              Short
            </option>

            <option>
              Medium
            </option>

            <option>
              Detailed
            </option>
          </select>

          <select
            value={coachStyle}
            onChange={(e) =>
              setCoachStyle(
                e.target.value
              )
            }
            className="w-full bg-slate-800 text-white p-3 rounded-xl"
          >
            <option>
              Professional
            </option>

            <option>
              Mentor
            </option>

            <option>
              Interviewer
            </option>
          </select>

          <select
            value={model}
            onChange={(e) =>
              setModel(
                e.target.value
              )
            }
            className="w-full bg-slate-800 text-white p-3 rounded-xl"
          >
            <option>
              llama3.2
            </option>

            <option>
              phi3
            </option>

            <option>
              gemma3
            </option>

            <option>
              qwen3
            </option>
          </select>
        </div>
      </div>

      {/* Appearance */}

      <div className="bg-[#071426] border border-cyan-900 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6">
          Appearance
        </h2>

        <div className="space-y-4">
          <select
            value={theme}
            onChange={(e) =>
              setTheme(
                e.target.value
              )
            }
            className="w-full bg-slate-800 text-white p-3 rounded-xl"
          >
            <option value="dark">
              Dark
            </option>

            <option value="light">
              Light
            </option>
          </select>

          <select
            value={accentColor}
            onChange={(e) =>
              setAccentColor(
                e.target.value
              )
            }
            className="w-full bg-slate-800 text-white p-3 rounded-xl"
          >
            <option value="cyan">
              Cyan
            </option>

            <option value="purple">
              Purple
            </option>

            <option value="green">
              Green
            </option>

            <option value="orange">
              Orange
            </option>
          </select>
        </div>
      </div>

      {/* Save Button */}

      <div>
        <button
          onClick={saveSettings}
          className="
            bg-cyan-500
            hover:bg-cyan-400
            text-black
            font-semibold
            px-6
            py-3
            rounded-xl
          "
        >
          Save Settings
        </button>
      </div>

      {/* Data Management */}

      <div className="bg-[#071426] border border-red-900 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-red-400 mb-6">
          Data Management
        </h2>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={
              clearResumeData
            }
            className="
              bg-red-600
              px-4
              py-3
              rounded-xl
              text-white
            "
          >
            Clear Resume
          </button>

          <button
            onClick={
              clearJDData
            }
            className="
              bg-red-600
              px-4
              py-3
              rounded-xl
              text-white
            "
          >
            Clear JD Match
          </button>

          <button
            onClick={
              clearCoachChat
            }
            className="
              bg-red-600
              px-4
              py-3
              rounded-xl
              text-white
            "
          >
            Clear Coach Chat
          </button>

          <button
            onClick={
              resetEverything
            }
            className="
              bg-red-800
              px-4
              py-3
              rounded-xl
              text-white
            "
          >
            Reset App
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;