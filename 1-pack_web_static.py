#!/usr/bin/python3
"""A Fabric script that generates a .tgz archive from the contents of the web_static folder of your AirBnB Clone repo,
using the function do_pack.
"""
from fabric.api import local
from datetime import datetime
import os

def do_pack():
    # Make a folder versions if it does not exist
    if local('mkdir -p versions').failed:
        return None
    
    # Generate time using datetime module
    record = datetime.now()
    
    # Turn date and time into a string using strftime
    t_str = record.strftime('%Y%m%d%H%M%S')
    
