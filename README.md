## Bacterial colony classifier

### Run locally with Docker Compose
Clone the repo and run:

`git clone git@github.com:timohus/bacterial-colony-classifier.git`

`cd bacterial-colony-classifier`

`docker-compose up`

Server and client images are hosted on DockerHub.
Thus, you can run them both without cloning the repo:

#### Spin up the server:
`docker run -d -p 3030:80 timohus/bacterial-colony-classifier-server:latest`

Remove the `-d` flag if you prefer to not run the
container in the detached (aka background) mode.
In this case start the client in a separate terminal window/tab.

#### Start the client:
`docker run -p 9000:80 timohus/bacterial-colony-classifier-client:latest`


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

In all the above methods, the server starts on port 