from langsmith import wrappers
import base64
from openai import OpenAI

# To investigate with LangSmith, execute: source ../.env


assertion = 'the country selection popup is visible'
instruction = f"""
Here is the assertion. Please tell whether it is truthy according to the screenshot.
=====================================
{assertion}
====================================="""
screenshot_path = "./vinted.png"

# Put base url & api key for ui-tars

client = wrappers.wrap_openai(OpenAI(
    base_url="<url>",
    api_key="<key>"))

models = client.models.list()
model = models.data[0].id

prompt = """
You are a senior testing engineer. User will give an assertion and a screenshot of a page. Please tell whether the assertion is truthy.

## Output Json String Format
\`\`\`
"{
  "pass": "<<is a string, true means the assertion is truthy>>", 
  "thought": "<<is a string, give the reason why the assertion is falsy or truthy. Otherwise.>>"
}"
\`\`\`

## Rules **MUST** follow
- Make sure to return **only** the JSON, with **no additional** text or explanations.
- Use English in \`thought\` part.
- You **MUST** strict follow up the **Output Json String Format**.

"""
with open(screenshot_path, "rb") as image_file:
    encoded_string = base64.b64encode(image_file.read()).decode("utf-8")

response = client.chat.completions.create(
    model=model,
    messages=[
        {
            "role": "system",
            "content": prompt,

        },
        {
            "role": "user",
            "content": [
                {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{encoded_string}"}},
                {"type": "text", "text": instruction},
            ],
        },
    ],
    temperature=0.0
)

print(response.choices[0].message.content)
