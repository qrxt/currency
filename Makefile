setup:
	npm i

dev:
	npm run dev & npm run server

typecheck-js:
	npm run typecheck

fmt:
	npx -p prettier@latest -p pretty-quick pretty-quick

test-js:
	npm test

lint:
	npm run lint

test:
	make fmt
	make lint
	make test-js

clean:
	npm run clean
