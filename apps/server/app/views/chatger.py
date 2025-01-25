import os
import subprocess
import time
import random
import gradio as gr
from app.config.settings.base import ROOT_DIR

homework_sessions = [
    "HW01",
    "HW02",
]

question_sessions = [
    "Q1",
    "Q2",
]

question_one_description = """\
### Q1
> 將價錢 ( 105、130 ) 用字串 slice 方式取出，並相加後，並賦值給變數 cost

```python
def hw1_0():
    string1 = "小明花105元買了蘋果"
    string2 = "小華花130元買了香蕉"
    #-------------------------------
    # 注意cost為字串(string)的型別
    # cost = # ...
    #-------------------------------
    return "小明和小華共花了" + cost + "元買水果"
```
"""

question_two_description = """\
### Q2
> 透過字串可使用的函式或方法，使用變數 str1 組合出 "ABCCCCdIIkGHH"，並賦值給 output

```python
def hw1_1():
    str1 = "abcdefghijk"
    output = ""
    #-------------------------------
    # output = # ...
    #-------------------------------
    return output
```
"""

homework_one_content_sessions = [
    question_one_description,
    question_two_description,
]

question_one_answer = """
class Solution:
    def main(self,):
        print("Hello World")
                        
if __name__ == "__main__":
    Solution.main()

"""


def chatger() -> gr.Blocks:
    with gr.Blocks(title="Chatger", theme=gr.themes.Default()) as demo:
        gr.HTML("<h1 align=center>✏️ Chatger</h1>")

        with gr.Tab("Submit Your Code"):
            gr.HTML("<h1 align=center>🔥 Show Your Endeavor 🔥</h1>")

            with gr.Row(equal_height=True):
                with gr.Column("Question"):
                    with gr.Row():
                        selected_homework_name = gr.Dropdown(
                            label="⛳️ Select Homework",
                            value=homework_sessions[0],
                            choices=homework_sessions,
                            interactive=True,
                        )
                        selected_question_name = gr.Dropdown(
                            label="📸 Select Question",
                            value=question_sessions[0],
                            choices=question_sessions,
                            interactive=True,
                        )
                    gr.Markdown("## 👨🏻‍💻 Question Descriptions")
                    question_description = gr.Markdown(
                        homework_one_content_sessions[0],
                        visible=True,
                    )
                with gr.Column("Chat Bot"):
                    chatbot = gr.Chatbot(type="messages")
                    msg = gr.Textbox(value="Type Something...", label="Message")
                    clear = gr.Button("Clear")

            with gr.Row(equal_height=True):
                with gr.Column():
                    answer_code = gr.Code(
                        value=question_one_answer,
                        label="Write Your code here",
                        language="python",
                        lines=10,
                    )

                    with gr.Row():
                        gr.Button(
                            value="🗑️  Clear",
                            variant="secondary",
                        )
                        submit_code_btn = gr.Button(
                            value="Submit",
                            variant="primary",
                        )
                with gr.Column():
                    judged_result = gr.Markdown("### Results of your submission: ")

                    gr.Markdown("### Review by ChatGPT: ")

        with gr.Tab("Race Bar"):
            gr.Markdown("Race Bar")

        with gr.Tab("Judge Mechanism"):
            gr.Markdown("Judge Mechanism")

        with gr.Tab("Judge Developers"):
            gr.Markdown("Judge Developers")

        def user(user_message, history: list):
            return "", history + [{"role": "user", "content": user_message}]

        def bot(history: list):
            bot_message = random.choice(
                ["How are you?", "I love you", "I'm very hungry"]
            )
            history.append({"role": "assistant", "content": ""})
            for character in bot_message:
                history[-1]["content"] += character
                time.sleep(0.05)
                yield history

        msg.submit(user, [msg, chatbot], [msg, chatbot], queue=False).then(
            bot, chatbot, chatbot
        )
        clear.click(lambda: None, None, chatbot, queue=False)

        submit_background_listener(
            selected_homework_name,
            selected_question_name,
            question_description,
        )

        submit_code_btn.click(
            fn=get_code,
            inputs=[
                answer_code,
                selected_homework_name,
                selected_question_name,
            ],
            outputs=[judged_result],
        )

    demo.favicon_path = ROOT_DIR / "static" / "favicon.ico"

    return demo


def get_question_description(selected_homework_name, selected_question_name):
    output_components = []

    if selected_homework_name == "HW01" and selected_question_name == "Q1":
        test_word = gr.Markdown(
            homework_one_content_sessions[0],
            visible=True,
        )
    elif selected_homework_name == "HW01" and selected_question_name == "Q2":
        test_word = gr.Markdown(
            homework_one_content_sessions[1],
            visible=True,
        )

    output_components.append(test_word)

    return test_word


def submit_background_listener(
    selected_homework_name,
    selected_question_name,
    test_word,
):
    selected_question_name.change(
        fn=get_question_description,
        inputs=[
            selected_homework_name,
            selected_question_name,
        ],
        outputs=test_word,
    )


def get_code(
    txt,
    selected_homework_name,
    selected_question_name,
):
    with open("tmp.py", "w") as file:
        file.write(txt)

    try:
        output = subprocess.check_output(
            ["python", "tmp.py"],
            stderr=subprocess.STDOUT,
            universal_newlines=True,
        )
        print("Script output:")
        print(output)

        if selected_homework_name == "HW01" and selected_question_name == "Q1":
            return judge_question_1(output)
    except subprocess.CalledProcessError as e:
        print("Error:", e.output)
        return e.output
    finally:
        os.remove("tmp.py")


def judge_question_1(output):
    if output == "Hello World\n":
        return "### Your code results: AC"
    elif output == "Hello World":
        return "### Your code results: AC"
    else:
        return "### Your code results: WA"
