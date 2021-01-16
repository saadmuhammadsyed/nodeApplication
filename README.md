# Docker + Jenkins CI/CD for NodeJS
a simple CI/CD setup for NodeJS application using Docker and Jenkins.

## Prerequisites
[Docker Desktop](https://www.docker.com/products/docker-desktop)    
[SocketXP](https://www.socketxp.com/download)  

## Dependencies
- Blue Ocean    
- Credentials Plugin    
- Docker Plugin    
- Github Plugin    
- NodeJS Plugin    
- Oracle Java SE Development Kit Installer Plugin  
- Pipeline Plugin  
- Timestamper  

## Central idea
Using Jenkins to build a Continuous Integration and Continuous Delivery development pipeline from scratch and automatically deploying it to DockerHub. the pipeline runs test and safely deploys the newer version.  

## Setup
**1.** Using this Jenkins image since it has docker client which can be further configured to use host docker's agent.
```
docker run u root --rm a -p 8080:8080 -p 50000:50000 -v "C:/Program Files/Docker/Jenkins":/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock --name jenkins jenkinsci/blueocean
```
Now the Jenkins would be accessible on http://localhost:8080/  
```
docker ps  
CONTAINER ID   IMAGE                 COMMAND                  CREATED        STATUS        PORTS                                              NAMES  
51ded368cd3a   jenkinsci/blueocean   "/sbin/tini -- /usr/…"   46 hours ago   Up 46 hours   0.0.0.0:8080->8080/tcp, 0.0.0.0:50000->50000/tcp   jenkins  
```
docker process status shown above  
**2.** SocketXP is used to expose our local Jenkins server so that it can recieve the github web-hook events on its endpoint, requiring reverse proxy to create a tunnel. 
```
socketxp login "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTMxMjg3MTgsImlkIjoic3llZHNtczk4QGdtYWlsLmNvbSJ9.uVWTRPJI8RDilLX63ZIpnl67jBZ6Dk2YI0qWtHjvaVA"
Login Succeeded.
User [] Email [syedsms98@gmail.com].  
```
URL generated from SocketXP as a web-hook for target repository in order to recieve the github events.  
```
https://syedsms98-hwg5rhf1.socketxp.com/github-webhook/
```
Now the Jenkins would be able to  recieve the web-hook events from the repository.


## Workflow
### Continous Integration 
This pipeline would run on master branch, pull the code, install dependencies and run code through
```
npm install
npm test
```
If all the test are successfully passed then it would merge the master branch to production. Logs are [here](https://github.com/saadmuhammadsyed/nodeApplication/blob/production/log.txt)
![](https://github.com/saadmuhammadsyed/nodeApplication/blob/production/image4.PNG)
### Continuous Development 
This pipeline would run after the continuous integration pipeline and will pull the code form production branch, build image using Dockerfile and then push the build image to docker hub.
![](https://github.com/saadmuhammadsyed/nodeApplication/blob/production/image1.PNG)

For these pipelines to work, configuring github ssh credentials(private and public key pairs) for pulling and pushing the repository is required as well as the dockerhub credentials for pushing the image to the image registry.  
Both thses are configured via the Jenkins Credentials Manager.
![](https://github.com/saadmuhammadsyed/nodeApplication/blob/production/image5.PNG)  

## references 
- [Docker Hub](https://docs.docker.com/)
- [CI/CD pipeline for a Node.js app](https://medium.com/@naistangz/building-a-ci-cd-pipeline-for-a-node-js-app-with-docker-and-jenkins-ee6db6e70d25#4bd9)
- [Pipeline with Jenkins](https://medium.com/@mosheezderman/how-to-set-up-ci-cd-pipeline-for-a-node-js-app-with-jenkins-c51581cc783c)

