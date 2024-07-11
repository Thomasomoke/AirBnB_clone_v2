#!/usr/bin/python3
"""a Fabric script that generates a .tgz archive from the contents of the web_static folder of your AirBnB Clone repo,
using the function do_pack.
"""
from fabric.api import*
from datetime import datetime
import os
def do_pack():

    #make a folder versions if it doe not exist

    local('mkdir -p versions')
#generate time using datetime module
    record = datetime.now()
#turn dae and time into a string using _str
    t_str = record.strftime('%Y%m%d%H%M%S')
#create an archive file using tar command 
    local(f'tar -cvzf versions/web_static_{t_str}.tgz web_static')
    f_path = f"versions/web_static_{t_str}.tgz"
    f_size = os.path.getsize{f_path}

    print(f"web_static packed: {f_path}  -> {f_size}Bytes")

