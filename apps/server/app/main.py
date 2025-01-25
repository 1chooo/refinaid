import uvicorn
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.config.settings.base import ROOT_DIR
from app.infra.web.router import setup_routers


app = FastAPI()
setup_routers(app)


@app.get("/")
async def hello_world() -> dict[str, str]:
    return {"message": "Hello, Refinaid"}


static_dir = ROOT_DIR / "static"
app.mount(
    "/static",
    StaticFiles(directory=static_dir),
    name="static",
)


@app.get("/favicon.ico", include_in_schema=False)
async def favicon() -> FileResponse:
    favicon_path = static_dir / "favicon.ico"
    return FileResponse(favicon_path)


if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8080,
        reload=True,
    )
