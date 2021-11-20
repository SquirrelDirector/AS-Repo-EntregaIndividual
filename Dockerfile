FROM node
WORKDIR /usr/app
RUN  npm install pg
RUN npm install express
RUN npm install nodemon -g

# ** [Optional] Uncomment this section to install additional packages. **
# USER root
#
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>
#
# USER codespace
