#!/bin/bash


for id in \
  "0a4ab857-19f9-426f-9f18-4618e444d63a"\
  "1dc10afd-c9e8-4eac-b055-74e0878570de"\
  "2d56656a-359b-407a-b982-537d81390dfa"\
  "31f66353-bad1-49f6-97b7-20321d14a95b"\
  "36a14b66-b768-45c7-9b2f-bd152e7c319b"\
  "4382ac79-2826-4a8d-915e-be19c91d69ae"\
  "509b500b-fea0-4958-b0e2-3810eed9ad3b"\
  "820394d6-998f-44a1-8a4d-616a102eae7c"\
  "8332e9ab-5f59-47c9-aec9-8af505f72ffb"\
  "949b713a-3646-4843-80c6-3dc040d6e40a"\
  "951cb0bd-cb0c-489f-9d89-dd287f5dfcf0"\
  "aa7d129e-675f-45ce-b6bc-f3bf3ecada2c"\
  "af7d2e11-fff0-4386-b6d1-50c34d5ad3c5"\
  "bf40f95c-e481-48ef-9e75-a49d1bafca84"\
  "d3e234fb-e27c-4d2a-90d6-d6da05422773"\
  "d65aaf8f-fb19-4244-8591-de8e7395e1d5"\
  "e3da6c0d-98b3-4a9e-a4b5-736cdb7c0fbb"\
  "e4bbae20-e19d-44de-bb5f-3c88479180ce"\
  "e7394c78-8bb0-41d8-b940-d83be68d6ca2"\
  "f6012af2-b76e-4ad6-b778-4594711083fd"\
  "33e16ada-17df-4d89-b483-3cf38bab7a29"\
  "68919b75-7dae-4fa6-91c5-0d5f0519d468"\
  "68919b75-7dae-4fa6-91c5-0d5f0519d468"\
  "68919b75-7dae-4fa6-91c5-0d5f0519d468"\
  "68919b75-7dae-4fa6-91c5-0d5f0519d468"\
  "68919b75-7dae-4fa6-91c5-0d5f0519d468"\
  "33e16ada-17df-4d89-b483-3cf38bab7a29"\
  "68919b75-7dae-4fa6-91c5-0d5f0519d468"\
  "33e16ada-17df-4d89-b483-3cf38bab7a29"\
  "68919b75-7dae-4fa6-91c5-0d5f0519d468"\
  "33e16ada-17df-4d89-b483-3cf38bab7a29"\
  "33e16ada-17df-4d89-b483-3cf38bab7a29"\
  "68919b75-7dae-4fa6-91c5-0d5f0519d468"\
  "68919b75-7dae-4fa6-91c5-0d5f0519d468"\
  "68919b75-7dae-4fa6-91c5-0d5f0519d468"\
  "33e16ada-17df-4d89-b483-3cf38bab7a29"\
  "68919b75-7dae-4fa6-91c5-0d5f0519d468"\
  "68919b75-7dae-4fa6-91c5-0d5f0519d468"\
  "68919b75-7dae-4fa6-91c5-0d5f0519d468"\
  "33e16ada-17df-4d89-b483-3cf38bab7a29";
  do
  curl -X DELETE http://localhost:8001/routes/$id
done


# Students

curl -i -X POST http://localhost:8001/services/students-service/routes \
  --data "name=students-get-all" \
  --data "methods[]=GET" \
  --data "paths[]=/api/students" \

curl -i -X POST http://localhost:8001/services/students-service/routes \
  --data "name=students-get-by-id" \
  --data "methods[]=GET" \
  --data "paths[]=/api/students/{id}" \

curl -i -X POST http://localhost:8001/services/students-service/routes \
  --data "name=students-create" \
  --data "methods[]=POST" \
  --data "paths[]=/api/students" \

curl -i -X POST http://localhost:8001/services/students-service/routes \
  --data "name=students-update" \
  --data "methods[]=PUT" \
  --data "paths[]=/api/students/{id}" \

curl -i -X POST http://localhost:8001/services/students-service/routes \
  --data "name=students-delete" \
  --data "methods[]=DELETE" \
  --data "paths[]=/api/students/{id}" \

curl -i -X POST http://localhost:8001/services/students-service/routes \
  --data "name=students-seed" \
  --data "methods[]=POST" \
  --data "paths[]=/api/students/seed/{seed}" \

curl -i -X POST http://localhost:8001/services/students-service/routes \
  --data "name=students-delete-multiple" \
  --data "methods[]=DELETE" \
  --data "paths[]=/api/students/delete" \


# Grades

curl -i -X POST http://localhost:8001/services/grades-service/routes \
  --data "name=grades-get-all" \
  --data "methods[]=GET" \
  --data "paths[]=/api/grades" \

curl -i -X POST http://localhost:8001/services/grades-service/routes \
  --data "name=grades-get-by-id" \
  --data "methods[]=GET" \
  --data "paths[]=/api/grades/{gradeId}" \

curl -i -X POST http://localhost:8001/services/grades-service/routes \
  --data "name=grades-create" \
  --data "methods[]=POST" \
  --data "paths[]=/api/grades" \

curl -i -X POST http://localhost:8001/services/grades-service/routes \
  --data "name=grades-update" \
  --data "methods[]=PATCH" \
  --data "paths[]=/api/grades/{gradeId}" \

curl -i -X POST http://localhost:8001/services/grades-service/routes \
  --data "name=grades-delete" \
  --data "methods[]=DELETE" \
  --data "paths[]=/api/grades/{gradeId}" \

curl -i -X POST http://localhost:8001/services/grades-service/routes \
  --data "name=grades-seed" \
  --data "methods[]=POST" \
  --data "paths[]=/api/grades/seed/{seed}" \

curl -i -X POST http://localhost:8001/services/grades-service/routes \
  --data "name=grades-get-by-student-id" \
  --data "methods[]=GET" \
  --data "paths[]=/api/grades/student/{id}" \

curl -i -X POST http://localhost:8001/services/grades-service/routes \
  --data "name=grades-student-top" \
  --data "methods[]=GET" \
  --data "paths[]=/api/grades/student/{id}/top" \

curl -i -X POST http://localhost:8001/services/grades-service/routes \
  --data "name=grades-student-average" \
  --data "methods[]=GET" \
  --data "paths[]=/api/grades/student/{id}/average" \

curl -i -X POST http://localhost:8001/services/grades-service/routes \
  --data "name=grades-top3-subject" \
  --data "methods[]=GET" \
  --data "paths[]=/api/grades/top3/{subject}" \

curl -i -X POST http://localhost:8001/services/grades-service/routes \
  --data "name=grades-types" \
  --data "methods[]=GET" \
  --data "paths[]=/api/grades/types" \

curl -i -X POST http://localhost:8001/services/grades-service/routes \
  --data "name=grades-subjects" \
  --data "methods[]=GET" \
  --data "paths[]=/api/grades/subjects" \

curl -i -X POST http://localhost:8001/services/grades-service/routes \
  --data "name=grades-delete-multiple" \
  --data "methods[]=DELETE" \
  --data "paths[]=/api/grades/delete" \
