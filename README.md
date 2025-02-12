# In Class Project

# Docker/MariaDB
'''shell

docker run --name my-database 
            -e MYSQL_ROOT_PASSWORD=123456 
            -e MYSQL_DATABASE=in-class-d 
            -e MYSQL_USER=-in-class-user 
            -e MYSQL_PASSWORD=123456 
            -p 3306:3306 -d mariadb 

'''