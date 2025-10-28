.PHONY: all build up down test k8s-deploy

build:
	docker build -t backend:local ./services/backend
	docker build -t frontend:local ./services/frontend

up:
	docker compose up --build -d

down:
	docker compose down

test:
	cd services/backend && npm test
	cd services/frontend && npm test -- --watchAll=false

k8s-deploy:
	kubectl apply -f charts/
