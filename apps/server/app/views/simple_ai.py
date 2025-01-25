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
                    gr.Markdown("## Dataset")
                    gr.Dropdown(
                        ["cat", "dog", "bird"],
                        label="Animal",
                        info="Will add more animals later!",
                    )
                    gr.Dropdown(
                        ["ran", "swam", "ate", "slept"],
                        value=["swam", "slept"],
                        multiselect=True,
                        label="Activity",
                        info="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, eget aliquam nisl nunc vel nisl.",
                    )

                with gr.Column():
                    gr.Markdown("## Forecast Visualization")
                    plot_output = gr.Plot(label="Visualization")

            with gr.Row():
                final_year = gr.Radio([2025, 2030, 2035, 2040], label="Project to:")
                companies = gr.CheckboxGroup(
                    ["Google", "Microsoft", "Gradio"], label="Company Selection"
                )
                noise = gr.Slider(1, 100, label="Noise Level")
                show_legend = gr.Checkbox(label="Show Legend")
                point_style = gr.Dropdown(["cross", "line", "circle"], label="Style")

                submit_button = gr.Button("Generate Forecast")

                submit_button.click(
                    plot_forecast,
                    inputs=[final_year, companies, noise, show_legend, point_style],
                    outputs=plot_output,
                )

        with gr.Tab("Training Model"):
            gr.Markdown("# Training Model")

        with gr.Tab("Training History"):
            gr.Markdown("# Training History")

    demo.favicon_path = ROOT_DIR / "static" / "favicon.ico"

    return demo
