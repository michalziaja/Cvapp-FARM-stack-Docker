FROM python:3.10

WORKDIR /app


# Install chrome driver 

RUN apt-get install -y wget unzip

RUN apt-get update -y

ENV CHROMEDRIVER_VERSION 114.0.5735.90
ENV CHROME_VERSION 114.0.5735.90-1

RUN wget --no-verbose -O /tmp/chrome.deb https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_${CHROME_VERSION}_amd64.deb \
  && apt install -y /tmp/chrome.deb \
  && rm /tmp/chrome.deb

ENV CHROMEDRIVER_DIR /chromedriver
RUN mkdir $CHROMEDRIVER_DIR

RUN wget -q --continue -P $CHROMEDRIVER_DIR "http://chromedriver.storage.googleapis.com/$CHROMEDRIVER_VERSION/chromedriver_linux64.zip"
RUN unzip $CHROMEDRIVER_DIR/chromedriver* -d $CHROMEDRIVER_DIR

ENV PATH $CHROMEDRIVER_DIR:$PATH


COPY ./requirements.txt requirements.txt

RUN pip install --upgrade pip

RUN pip install --no-cache-dir -r requirements.txt

COPY . ./

EXPOSE 8000

CMD ["uvicorn", "app.app:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
