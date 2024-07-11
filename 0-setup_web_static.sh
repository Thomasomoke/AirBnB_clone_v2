#!/usr/bin/env bash
# a Bash script that sets up your web servers for the deployment of web_static

#update and install nginx
sudo apt-get update
sudo apt-get -y install nginx

#Allow 'Nginx HTTP' through the firewall
sudo ufw allow 'Nginx HTTP'

#make necessary directory
sudo mkdir -p /data/
sudo mkdir -p /data/web_static/
sudo mkdir -p /data/web_static/releases/
sudo mkdir -p /data/web_static/shared/
sudo mkdir -p /data/web_static/releases/test/

#create a  fake HTML file to test Nginx configuration

echo "<html>
  <head>
    <title>Thomas ALX student</title>
  </head>
  <body>
    <Bash script to set up your web servers for the deployment of web static</h1>
  </body>
</html>" | sudo tee /data/web_static/releases/test/index.html

# Remove existing symbolic link if it exists
if [ -L /data/web_static/current ]; then
    sudo rm /data/web_static/current
fi

# Create a new symbolic link
sudo ln -sf /data/web_static/releases/test/ /data/web_static/current

# Give ownership of the /data/ directory to the ubuntu user and group, recursively
sudo chown -R ubuntu:ubuntu /data/

# Update the Nginx configuration to serve the content of /data/web_static/current/ to hbnb_static
sudo sed -i '/server_name _;/a \\tlocation /hbnb_static/ {\n\t\talias /data/web_static/current/;\n\t}\n' /etc/nginx/sites-available/default

# Restart Nginx to apply the changes
sudo service nginx restart

