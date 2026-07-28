import path from "path"

process.env.DEWCODE_DB = ":memory:"
process.env.DEWCODE_MODELS_PATH = path.join(import.meta.dir, "plugin", "fixtures", "models-dev.json")
process.env.DEWCODE_DISABLE_MODELS_FETCH = "true"
