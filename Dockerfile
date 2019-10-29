FROM 10.200.16.14:60080/customer/nginx:v1.13.12

ADD ./dist /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d

ENV GW_SERVICE ip-apigw

ENV GW_PORT 11000

EXPOSE 8080

CMD ["/usr/sbin/nginx","-g","daemon off;"]
