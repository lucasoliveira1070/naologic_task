<h1 align="left">Naologic Interview - Backend Software Engineer - Lucas Oliveira</h1>

###

<h4 align="left">Summary of the project: A cronjob that will run once a day, every day. Its purpose is to download a 40MB CSV file, parse the data, hydrate and save it to the database. Afterward, a prompt is executed on Google Gemini to enhance the description of items. (In this scenario, only 10 items at a time.)</h4>

###

<h3 align="left">Folder structure</h3>

###

<h4 align="left">I opted for a lean and more objective project.</h4>

###

<div align="left">
  <img height="400" src="https://storage.googleapis.com/bucket-lucas-oliveira-se-portfolio/folder_structure.png"  />
</div>

###

<h3 align="left">How to run</h3>

###

<h4 align="left">If you run the project through an IDE, you'll need a MongoDB running and you must add the .env file to the project root with the following values:<br>DATABASE_URI: mongodb://root:root@mongodb:27017/naologic?authSource=admin<br>      DATABASE_NAME: naologic<br>      GEMINI_API_KEY:<br>      CSV_FILE_PATH: ./images40.txt<br>      CRON_TIME: '0 04 * * *'</h4>

###

<h4 align="left">Don't worry, I'm here to make your life easier.<br>I've prepared a docker-compose.yaml file that will run a container with MongoDB and an image of this application.<br>Just execute the command "docker compose up".<br>The task requirement is for the job to run once a day, but to see the application working faster, in the docker-compose.yaml file, set the environment variable "CRON_TIME" to the following value: '*/10 * * * * *'. This way, the application will run every 10 seconds.</h4>

###

<h2 align="left">Highlights</h2>

###

<h4 align="left">Due to being a large file and the 2GB memory limit, I processed the CSV file using async generators. The use of async generators allows processing the CSV file asynchronously and on demand. This means that each line of the file is read and processed as needed, without the need to store all lines in memory at the same time.</h4>

###

<div align="left">
  <img height="400" src="https://storage.googleapis.com/bucket-lucas-oliveira-se-portfolio/async_generators.png"  />
</div>

###

<h4 align="left">As the object to be saved in the database was quite complex, I used the Builder creational design pattern, which greatly facilitates the creation of objects with many attributes, some of which may or may not be required.</h4>

###

<div align="left">
  <img height="400" src="https://storage.googleapis.com/bucket-lucas-oliveira-se-portfolio/product_builder.png"  />
</div>

###

<h4 align="left">Following Clean Architecture best practices, I used abstract repositories to decouple the project structure. If the database mechanism changes in the future, no changes will be required in the business rules, only in the outer layer.</h4>

###

<div align="left">
  <img height="180" src="https://storage.googleapis.com/bucket-lucas-oliveira-se-portfolio/abstract_repository.png"  />
</div>

###

<h4 align="left">P.S: Instead of using chatgpt4, I chose to use Google Gemini, the implementation is practically the same, just changing the provider.<br>I made this decision for financial reasons, as I had reached the quota limit established by OpenAi. I hope you understand.</h4>

###
