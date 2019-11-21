FROM node:latest
RUN apt update

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

ENTRYPOINT [ "/app/entrypoint.sh" ]
# ENTRYPOINT [ "tail", "-f", "/dev/null" ]