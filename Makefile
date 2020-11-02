PHONY= clean

name=frontend
sname=fr
port=3000

run:
	npm run dev

start:
	docker run --publish $(port):$(port) --detach --name $(sname) $(name)

build:
	docker build -t $(name) .

clean:
	docker rm --force $(sname)
