#!/bin/bash

echo "Deleting existing Kong routes..."

# Remove duplicate IDs and delete routes
# for id in $(echo "

# " | sort -u); do
#   curl -s -o /dev/null -X DELETE "http://kong-gateway:8001/routes/$id"
#   echo "Deleted route ID: $id"
# done

echo "Registering new routes..."

# Helper function to create routes
register_route() {
  local service="$1"
  local name="$2"
  local method="$3"
  local path="$4"

  curl -s -o /dev/null -X POST "http://kong-gateway:8001/services/$service/routes" \
    --data "name=$name" \
    --data "methods[]=$method" \
    --data "paths[]=$path"

  echo "Created route: $name -> $method $path"
}

# Register students-service routes
register_route "students-service" "students-get-all" "GET" "/api/students"
register_route "students-service" "students-get-by-id" "GET" "/api/students/(?<id>.+)"
register_route "students-service" "students-create" "POST" "/api/students"
register_route "students-service" "students-update" "PUT" "/api/students/(?<id>.+)"
register_route "students-service" "students-delete" "DELETE" "/api/students/(?<id>.+)"
register_route "students-service" "students-seed" "POST" "/api/students/seed/(?<seed>.+)"
register_route "students-service" "students-delete-multiple" "DELETE" "/api/students/delete"

# Register grades-service routes
register_route "grades-service" "grades-get-all" "GET" "/api/grades"
register_route "grades-service" "grades-get-by-id" "GET" "/api/grades/(?<gradeId>.+)"
register_route "grades-service" "grades-create" "POST" "/api/grades"
register_route "grades-service" "grades-update" "PATCH" "/api/grades/(?<gradeId>.+)"
register_route "grades-service" "grades-delete" "DELETE" "/api/grades/(?<gradeId>.+)"
register_route "grades-service" "grades-seed" "POST" "/api/grades/seed/(?<seed>.+)"
register_route "grades-service" "grades-get-by-student-id" "GET" "/api/grades/student/(?<id>.+)"
register_route "grades-service" "grades-student-top" "GET" "/api/grades/student/(?<id>.+)/top"
register_route "grades-service" "grades-student-average" "GET" "/api/grades/student/(?<id>.+)/average"
register_route "grades-service" "grades-top3-subject" "GET" "/api/grades/top3/(?<subject>.+)"
register_route "grades-service" "grades-types" "GET" "/api/grades/types"
register_route "grades-service" "grades-subjects" "GET" "/api/grades/subjects"
register_route "grades-service" "grades-delete-multiple" "DELETE" "/api/grades/delete"

echo "Kong routes setup complete!"
