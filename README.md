# nodeApplication
CI/CD pipeline for a Node.js application with Docker and Jenkins

## prerequisites
[Docker](https://www.docker.com/products/docker-desktop)  
[Docker Hub](https://hub.docker.com/)   
[Jenkins](https://www.jenkins.io/download/)  
[SocketXP](https://www.socketxp.com/download)  

## dependencies  
- Blue Ocean    
- Credentials Plugin    
- Docker Plugin    
- Github Plugin    
- NodeJS Plugin    
- Oracle Java SE Development Kit Installer Plugin  
- Pipeline Plugin  
- Timestamper  

## central idea
using Jenkins to build a Continuous Integration and Continuous Delivery development pipeline from scratch and automatically deploying it to DockerHub. the pipeline runs test and safely deploys the newer version.    

## initialization
make sure you've virtuallization 'enabled'. then move onto making a dockerfile and then build a corresponding docker image and configure your git repo. consider setting up *web hooks* to your repository, for this to work you've to download the [SocketXP](https://www.socketxp.com/download). then pour all the files to github. install node locally(if it's not previously installed). make an account on [Docker Hub](https://hub.docker.com/)   
now to run jenkins on docker  
```
docker pull jenkins/jenkins   
```
start jenkins and install all the above stated plugins and NodeJS from the Global Tool Configuration. now we finally run our app.    
```
node app.js  
```
followed by a response *listening at http://localhost:3000*  

## workflow  
now start from creating a continuous integration build. one would have to ping his github repository here as well. separate build would be required for a continuous deployment build. here configuration takes place to build an image based on the dockerfile and deploy it onto dockerhub automatically. now a new repository would be created in dockerhub as this will show jenkins where to push the image. we also add a pipeline script.   
![IMAGE](https://github.com/saadmuhammadsyed/nodeApplication/blob/master/image1.PNG?raw=true)
