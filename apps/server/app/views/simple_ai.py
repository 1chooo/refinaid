import numpy as np
import gradio as gr
import matplotlib.pyplot as plt

from app.config.settings.base import ROOT_DIR


def plot_forecast(
    final_year,
    companies,
    noise,
    show_legend,
    point_style,
) -> plt.Figure:
    start_year = 2020
    x = np.arange(start_year, final_year + 1)
    year_count = x.shape[0]
    plt_format = ({"cross": "X", "line": "-", "circle": "o--"})[point_style]
    fig = plt.figure()
    ax = fig.add_subplot(111)
    for i, company in enumerate(companies):
        series = np.arange(0, year_count, dtype=float)
        series = series**2 * (i + 1)
        series += np.random.rand(year_count) * noise
        ax.plot(x, series, plt_format)
    if show_legend:
        plt.legend(companies)
    return fig


def simple_ai() -> gr.Blocks:
    with gr.Blocks(title="Simple AI") as demo:
        gr.HTML("<h1 align=center>🐻 Simple AI</h1>")

        with gr.Tab("Data Processing"):
            gr.Markdown("# Interactive with Data\nLet's play with data!")

            with gr.Row(equal_height=True):
                with gr.Column():
                    dataset = gr.Dropdown(
                        ["cat", "dog", "bird"],
                        label="Dataset",
                        info="Select a dataset",
                        interactive=True,
                    )
                    parameters = gr.Dropdown(
                        ["ran", "swam", "ate", "slept"],
                        value=["swam", "slept"],
                        multiselect=True,
                        label="Multiple Parameters",
                        info="Select multiple parameters",
                        interactive=True,
                    )
                    miss_value_method = gr.Radio(
                        ["park", "zoo", "road"],
                        label="Missing Value Handling",
                        info="Selected a Method",
                        interactive=True,
                    )

                    data_scale_scaling = gr.Radio(
                        value="None",
                        choices=["None", "Standard", "Min-Max"],
                        label="Data Scaling",
                        info="Selected a Method",
                        interactive=True,
                    )
                    training = gr.Slider(
                        label="Training Set",
                        value=70,
                        minimum=0,
                        maximum=100,
                        step=5,
                        interactive=True,
                    )
                    validation = gr.Slider(
                        label="Validation Set",
                        value=10,
                        minimum=0,
                        maximum=100,
                        step=5,
                        interactive=True,
                    )
                    testing = gr.Slider(
                        label="Testing Set",
                        value=20,
                        minimum=0,
                        maximum=100,
                        step=5,
                        interactive=True,
                    )

                with gr.Column():
                    preview = gr.Plot(
                        label="Preview Data",
                    )
                    with gr.Row():
                        gr.Dropdown(
                            ["cat", "dog", "bird"],
                            label="X-axis",
                            info="Select a parameter",
                            interactive=True,
                        )
                        gr.Dropdown(
                            ["cat", "dog", "bird"],
                            label="Y-axis",
                            info="Select a parameter",
                            interactive=True,
                        )
                    gr.Examples(
                        examples=examples,
                        inputs=[
                            dataset,
                            parameters,
                            miss_value_method,
                            data_scale_scaling,
                            training,
                            validation,
                            testing,
                        ],
                        label="Data Preprocessing Example",
                    )

            gr.Button(
                value="Submit Data Preprocessing Results",
                variant="primary",
            )

            with gr.Row():
                final_year = gr.Radio(
                    value=2025,
                    choices=[2025, 2030, 2035, 2040],
                    label="Project to:",
                    interactive=True,
                )
                companies = gr.CheckboxGroup(
                    choices=["Google", "Microsoft", "Gradio"],
                    value=["Google"],
                    label="Company Selection",
                    interactive=True,
                )
                noise = gr.Slider(
                    label="Noise Level",
                    value=10,
                    minimum=1,
                    maximum=100,
                    step=5,
                    interactive=True,
                )

                show_legend = gr.Checkbox(label="Show Legend")
                point_style = gr.Dropdown(
                    ["cross", "line", "circle"],
                    label="Style",
                )

                submit_button = gr.Button("Generate Forecast")

                submit_button.click(
                    plot_forecast,
                    inputs=[final_year, companies, noise, show_legend, point_style],
                    outputs=preview,
                )

        with gr.Tab("Training Model"):
            gr.Markdown("# Training Model")

        with gr.Tab("Training History"):
            gr.Markdown("# Training History")

    demo.favicon_path = ROOT_DIR / "static" / "favicon.ico"

    return demo


examples = [
    [
        "Titanic",
        [
            "PassengerId",
            "Pclass",
            "Sex",
            "Age",
            "SibSp",
            "Parch",
            "Ticket",
            "Fare",
            "Cabin",
            "Embarked",
        ],
        "Drop Nan",
        "None",
        70,
        10,
        20,
    ],
    [
        "Titanic",
        [
            "PassengerId",
            "Pclass",
            "Sex",
            "Age",
            "SibSp",
            "Parch",
            "Ticket",
            "Fare",
        ],
        "By Columns",
        "Standard",
        70,
        10,
        20,
    ],
    [
        "Titanic",
        [
            "PassengerId",
            "Pclass",
            "Sex",
            "Age",
            "SibSp",
            "Parch",
            "Ticket",
            "Fare",
        ],
        "By Columns",
        "Min-Max",
        70,
        10,
        20,
    ],
    [
        "Diabetes",
        [
            "Pregnancies",
            "Glucose",
            "BloodPressure",
            "SkinThickness",
            "Insulin",
            "BMI",
            "DiabetesPedigreeFunction",
            "Age",
        ],
        "By Columns",
        "Min-Max",
        70,
        10,
        20,
    ],
]
