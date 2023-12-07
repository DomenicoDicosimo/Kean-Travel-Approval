import logging

from server import create_app

logging.basicConfig(level=logging.INFO)

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)