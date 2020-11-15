.DEFAULT_GOAL:=help
.PHONY: help clean

NAME=frontend
SHORT_NAME=fr
PORT=3000

# use syntax below to write an explanatory text for the target and to include printing the target
#: list all targets
help:
	@grep -B1 -E "^[a-zA-Z0-9_-]+\:([^\=]|$$)" Makefile \
     | grep -v -- -- \
     | sed 'N;s/\n/###/' \
     | sed -n 's/^#: \(.*\)###\(.*\):.*/\2###\1/p' \
     | column -t  -s '###'
#: Run
run:
	npm run dev

test: ## Test
	npm run test

#: run docker container
start: ## Start
	docker run --publish $(PORT):$(PORT) --detach --name $(SHORT_NAME) $(NAME) 

#: build docker container
build: ## Build
	docker build -t $(NAME) .

#: clean docker container
clean: ## Clean
	docker rm --force $(SHORT_NAME)
