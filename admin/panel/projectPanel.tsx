import type { ProjectRow } from "./props";
import { useEffect, useState } from "react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLICKEY = import.meta.env.VITE_SUPABASE_PUBLICKEY;

const fetchProjectData = async (): Promise<ProjectRow[]> => {
  if (!SUPABASE_PUBLICKEY) {
    throw new Error("Brak klucza publicznego Supabase");
  }

  const response = await fetch(`${SUPABASE_URL}?select=*`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_PUBLICKEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Nie udało się pobrać projektów (${response.status})`);
  }

  return response.json();
};

export default () => {
  const [projectData, setProjectData] = useState<ProjectRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editedProject, setEditedProject] = useState<ProjectRow | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchProjectData()
      .then((rows) => {
        if (!cancelled) setProjectData(rows);
      })
      .catch((err: unknown) => {
        if (!cancelled)
          setError(
            err instanceof Error
              ? err.message
              : "Nie udało się pobrać projektów",
          );
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!screenshotFile) {
      setScreenshotPreview(null);
      return;
    }
    const url = URL.createObjectURL(screenshotFile);
    setScreenshotPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [screenshotFile]);

  const openEditor = (project: ProjectRow | null) => {
    setScreenshotFile(null);
    setEditedProject(project);
  };

  const updateField = <K extends keyof ProjectRow>(
    key: K,
    value: ProjectRow[K],
  ) => {
    setEditedProject((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Ustawienia projektow</h1>
      {error && <p className="text-red-400">{error}</p>}
      <ul>
        {projectData.map((project) => (
          <div>
            <li key={project.id}>
              <p>{project.companyName}</p>
              <i>{project.cardText}</i>
              <br />
              <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={() => openEditor(project)}
              >
                Edytuj
              </button>
            </li>
            <hr />
          </div>
        ))}
      </ul>
      {editedProject && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black"
          onClick={() => openEditor(null)}
        >
          <div
            className="grid gap-4 bg-white text-black p-6 rounded-lg [&_input]:border [&_textarea]:border [&_input]:p-1 [&_textarea]:p-1"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold">{editedProject.companyName}</h2>
            <p>CardText</p>
            <input
              type="text"
              value={editedProject.cardText ?? ""}
              onChange={(e) => updateField("cardText", e.target.value)}
            />
            <p>Technologies</p>
            <input
              type="text"
              value={(editedProject.technologies ?? []).join(", ")}
              onChange={(e) =>
                updateField(
                  "technologies",
                  e.target.value.split(",").map((t) => t.trim()),
                )
              }
            />
            <p>Screenshot</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setScreenshotFile(e.target.files?.[0] ?? null)}
            />
            <p>{screenshotPreview ? "Preview" : "Current"}</p>
            {(screenshotPreview ?? editedProject.screenshot) && (
              <img
                src={screenshotPreview ?? editedProject.screenshot ?? ""}
                alt="Screenshot"
                className="w-32 h-32 object-cover"
              />
            )}
            <p>Domain</p>
            <input
              type="text"
              value={editedProject.url ?? ""}
              onChange={(e) => updateField("url", e.target.value)}
            />
            <p>LongText</p>
            <textarea
              value={editedProject.longText ?? ""}
              onChange={(e) => updateField("longText", e.target.value)}
            />
            <p>Tasks</p>
            <textarea
              value={(editedProject.tasks ?? []).join("\n")}
              onChange={(e) => updateField("tasks", e.target.value.split("\n"))}
            />

            <button
              className="bg-blue-500 text-white p-2 rounded"
              onClick={() => console.log("Zapisz zmiany", editedProject)}
            >
              Zapisz zmiany
            </button>
            <button
              className="bg-red-500 text-white p-2 rounded"
              onClick={() => console.log("Usuń projekt", editedProject.id)}
            >
              Usuń projekt
            </button>

            <button onClick={() => openEditor(null)}>Zamknij</button>
          </div>
        </div>
      )}
    </div>
  );
};
