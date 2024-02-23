import re

def extract_company_name(url, job_position):
    
    job_position = job_position.replace(' ', '-')
    job_position = job_position.lower()

    if job_position in url:
       
        start_index = url.find(job_position)

        company = url[:start_index].strip()

        company = company.rsplit("/", 1)[-1]

        company = re.sub(r'\W+', ' ', company).title()
    return company

url = "https://justjoin.it/offers/master-of-code-global-devops-engineer-warsaw-339705"
job_position = "DevOps Engineer"
result = extract_company_name(url, job_position)
print(result)





