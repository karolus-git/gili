FROM python:3.10.7-slim

WORKDIR /backend
COPY requirements.txt .
RUN pip3 install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "fast:app", "--reload", "--host","0.0.0.0"] 
