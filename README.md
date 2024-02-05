# CVapp - FARM Stack

[Watch CVapp Demo on YouTube](https://youtu.be/KcfQxfvir_g)

## Overview

CVapp is an application designed to streamline the job application process across various platforms. It optimizes user experience by providing features for user management, authentication, job details extraction, and platform support. The application is built using the FARM Stack (FastAPI, React, MongoDB) and integrates Selenium for web scraping.

## Features

### User Management and Authentication

- Users can create accounts and log in to access the React-based dashboard.

### FARM Stack & Selenium Integration

- FastAPI and Selenium are utilized to extract job details automatically from inputted job URLs.

### Multi-Platform Support

- The application currently supports 5 major job platforms: pracuj.pl, nofluffyjobs.com, theprotocol.it, indeed.com, and justjoin.it.

### Status Management

- Users can conveniently change the status of job applications within the dashboard, helping them track their progress.

### URL Conversion

- Job URLs are automatically converted to lead directly to the specific job offer page, enhancing user experience.

### Containerized with Docker

- The entire application is containerized with Docker, ensuring a smooth and consistent experience in any environment, including local development setups.

### Chrome Plugin (In Development)

- A plugin is under development to further streamline the job application process, making it even more user-friendly.

## Run the Application

To run the application locally, use the following command:

```bash
docker-compose up --build
