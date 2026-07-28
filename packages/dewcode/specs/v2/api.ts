// @ts-nocheck

import { DEWCode } from "@dewcode-ai/core"
import { ReadTool } from "@dewcode-ai/core/tools"

const dewcode = DEWCode.make({})

dewcode.tool.add(ReadTool)

dewcode.tool.add({
  name: "bash",
  schema: {
    type: "object",
    properties: {
      command: {
        type: "string",
        description: "The command to run.",
      },
    },
    required: ["command"],
  },
  execute(input, ctx) {},
})

dewcode.auth.add({
  provider: "openai",
  type: "api",
  value: process.env.OPENAI_API_KEY,
})

dewcode.agent.add({
  name: "build",
  permissions: [],
  model: {
    id: "gpt-5-5",
    provider: "openai",
    variant: "xhigh",
  },
})

const sessionID = await dewcode.session.create({
  agent: "build",
})

dewcode.subscribe((event) => {
  console.log(event)
})

await dewcode.session.prompt({
  sessionID,
  text: "hey what is up",
})

await dewcode.session.prompt({
  sessionID,
  text: "what is up with this",
  files: [
    {
      mime: "image/png",
      uri: "data:image/png;base64,xxxx",
    },
  ],
})

await dewcode.session.wait()

console.log(await dewcode.session.messages(sessionID))
