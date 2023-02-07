# Cell phone towers frontend

This is the frontend for the cell phone towers project found at https://github.com/ericvillemure/towers-frontend-vite
The backend project used to interact with it can be found here: https://github.com/ericvillemure/towers-rest-bigquery
A publicly accessible deployment can be tried (note that this project is a work in progress) here: http://34.160.217.181/


## To run locally

1. Change line 10 of vite.config.ts to match wether or not you use the locally running backend or the deployed one
2. Run npm run dev

## To deploy

1. Run npm run build
2. Upload the content of the dist/ folder to the Bocket named cell-towers-ca
3. The latest deployed version of this code can be tested here: http://34.160.217.181/