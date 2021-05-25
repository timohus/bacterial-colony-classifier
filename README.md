## Bacterial colony classifier

Demo is available here: [https://bacterial-colony-classifier.timohus.com/](https://bacterial-colony-classifier.timohus.com/)

### Run locally with Docker Compose
Clone the repo and run:

`git clone git@github.com:timohus/bacterial-colony-classifier.git`

`cd bacterial-colony-classifier`

`docker-compose up`

### Development

Clone the repo and `cd` into the project folder: 
`git clone git@github.com:timohus/bacterial-colony-classifier.git`

`cd bacterial-colony-classifier`

Start the dev instance of the server using Docker Compose:

```commandline
cd server
docker-compose up
```

This will start the Django dev server on the port 3030

Start the client using npm:
```commandline
cd client
npm run start
```
This will start development server on the port 3000.