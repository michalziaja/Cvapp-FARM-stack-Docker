from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium_stealth import stealth
from urllib.parse import urlparse, urlunparse
import time
import re
import os

from selenium.webdriver.chrome.service import Service #Docker

class SeleniumService:
    def __init__(self):
        self.driver = self._configure_driver()

    def _configure_driver(self):
        
        CHROMEDRIVER_DIR = os.getenv("CHROMEDRIVER_DIR") #Docker
        DRIVER_PATH = os.path.join(CHROMEDRIVER_DIR, "chromedriver") #Docker
        
        
        options = Options()
        options.add_argument('--start-maximized')
        options.page_load_strategy = 'normal'
        options.add_argument("--headless=new")
        options.add_argument('--no-sandbox')
        options.add_argument("window-size=800,600")
        options.add_argument("disable-infobars")
        options.add_argument("--enable-features=ReaderMode")
        options.add_experimental_option("excludeSwitches", ["enable-automation"])
        options.add_experimental_option('useAutomationExtension', False)
        prefs = {"credentials_enable_service": False,
            "profile.password_manager_enabled": False}
        options.add_experimental_option("prefs", prefs)

        options.add_argument('--disable-dev-shm-usage') #Docker
        service = Service(executable_path=DRIVER_PATH)  #Docker
        driver = webdriver.Chrome(options=options, service=service)

        #driver = webdriver.Chrome(options=options)  #Docker
        
        stealth(driver, vendor="Google Inc.", platform="Win32", webgl_vendor="Intel Inc.", renderer="Intel Iris OpenGL Engine", fix_hairline=True)

        return driver


    def generate_detail_link(self, search_link):
        index_vjk = search_link.find("vjk=")
        if index_vjk != -1:
            start_index = index_vjk + len("vjk=")
            end_index = search_link.find("&", start_index)
            jk_token = search_link[start_index:end_index] if end_index != -1 else search_link[start_index:]
            new_link = f"https://pl.indeed.com/viewjob?jk={jk_token}"
            final_link = new_link.split("&", 1)[0]
            return final_link          
        else:
            return search_link

    def transform_url(self, url):
        index_praca = url.find("/praca/")
        if index_praca != -1:
            new_link = "https://theprotocol.it/szczegoly/praca/" + url[index_praca + len("/praca/"):]
            parsed_url = urlparse(new_link)
            cleaned_url = urlunparse(parsed_url._replace(query=''))
            return cleaned_url
        else:
            return url     

    def extract_company_name(self, url, job_position):
        job_position = job_position.replace(' ', '-')
        job_position = job_position.lower()

        if job_position in url:
            start_index = url.find(job_position)
            company = url[:start_index].strip()
            company = company.rsplit("/", 1)[-1]
            company = re.sub(r'\W+', ' ', company).title()
            return company
        return None
        
    # def extract_company_name(self, url, job_position):
    #     job_position = job_position.lower()

    #     
    #     url_parts = url.rstrip('/').split('/')
    #     company = url_parts[-1].strip()

    #    
    #     if company.lower() not in job_position:
    #         # If not, use the part of the URL before the job position
    #         company = url_parts[-2].strip()

    #    
    #     company = re.sub(r'\W+', ' ', company).title()

    #     return company


    

    def data_from_url(self, url):
        site, job_position, company_name, offer_url = "", "", "", ""
        

        try:
            
            if "pracuj" in url:
                self.driver.get(url)
                wait = WebDriverWait(self.driver, 1)
                wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, 'button[data-test="button-submitCookie"]'))).click()
                site = "pracuj.pl"
                wait = WebDriverWait(self.driver, 1)
                job_position = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-scroll-id][data-test="text-positionName"]'))).text
                company = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-scroll-id][data-test="text-employerName"]'))).text
                company_name = company.replace("About the company", "").replace("O firmie", "")
                offer_url = url

            elif "indeed" in url:
                new_link = self.generate_detail_link(url)
                self.driver.get(new_link)
                time.sleep(1)
                wait = WebDriverWait(self.driver, 1)
                wait.until(EC.element_to_be_clickable((By.ID, 'onetrust-accept-btn-handler'))).click()
                site = "indeed.com"
                wait = WebDriverWait(self.driver, 1)
                company_name = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-company-name="true"]'))).text
                job_position = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.jobsearch-JobInfoHeader-title span'))).text
                offer_url = new_link.split("&", 1)[0]

            elif "protocol.it" in url:
                new_link = self.transform_url(url)
                self.driver.get(new_link)
                time.sleep(1)
                wait = WebDriverWait(self.driver, 1)
                wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, 'button[data-test="button-acceptAll"]'))).click()
                site = "theprotocol.it"
                wait = WebDriverWait(self.driver, 1)
                job_position = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, 'h1[data-test="text-offerTitle"]'))).text
                company_name = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, 'a[data-test="anchor-company-link"]'))).text
                offer_url = new_link

            elif "nofluffjobs" in url:
                self.driver.get(url)
                wait = WebDriverWait(self.driver, 1)
                wait.until(EC.element_to_be_clickable((By.ID, 'onetrust-accept-btn-handler'))).click()
                site = "nofluffjobs.com"
                wait = WebDriverWait(self.driver, 1)
                job_position = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, 'h1.font-weight-bold.bigger'))).text
                company_name = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, 'p.d-flex.align-items-center.mb-0'))).text
                offer_url = url

            elif "justjoin.it" in url:
                self.driver.get(url)
                wait = WebDriverWait(self.driver, 1)
                
                wait.until(EC.element_to_be_clickable((By.XPATH, '//button[@name="cookies_button"]'))).click()

                site = "justjoin.it"
                
                wait = WebDriverWait(self.driver, 1)
                job_position = wait.until(EC.presence_of_element_located((By.XPATH, '//h1[@class]'))).text
                
                #print(job_position)
                
                #job_position = "test"
                #company_name = self.extract_company_name(url, job_position)

                company_name = "none"
                offer_url = url

            elif "linkedin.com" in url:
                self.driver.get(url)
                
                wait = WebDriverWait(self.driver, 1)
                wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button[data-control-name='ga-cookie.consent.accept.v4']"))).click()
                site = "linkedin.com"
                wait = WebDriverWait(self.driver, 1)
                job_position = wait.until(EC.presence_of_element_located((By.XPATH, '//h1[@class]'))).text
                company_name = wait.until(EC.presence_of_element_located((By.CLASS_NAME, "topcard__org-name-link"))).text
                offer_url = url


        finally:
            self.driver.quit()
            return site, job_position, company_name, offer_url
