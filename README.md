# Black Hole Simulator

A web-based simulation of particles interacting with a black hole using Python and Flask.

## Description

This project simulates the behavior of particles around a black hole using a web-based interface. The simulation uses Flask for the backend and JavaScript for the frontend visualization.

## Features

- Real-time particle simulation
- Interactive web interface
- Random particle generation
- Black hole gravitational effects visualization

## Prerequisites

- Python 3.x
- Flask
- Web browser with JavaScript enabled

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd blackhole-simulator
```

2. Install the required dependencies:
```bash
pip install flask
```

## Project Structure

```
blackhole_simulator/
├── app.py              # Main Flask application
├── static/             # Static files (CSS, JavaScript)
├── templates/          # HTML templates
│   └── index.html     # Main page template
└── README.md          # This file
```

## Running the Application

1. Start the Flask server:
```bash
python blackhole_simulator/app.py
```

2. Open your web browser and navigate to:
```
http://127.0.0.1:5000
```

## API Endpoints

- `GET /`: Renders the main simulation page
- `GET /particles`: Returns JSON data of particle positions

## Development

The application is running in debug mode, which is suitable for development. For production deployment, make sure to:
- Disable debug mode
- Set up proper security measures
- Configure a production-grade WSGI server

## Contributing

Feel free to submit issues and enhancement requests!

## License

[Your chosen license]

## Author

[Your name] 