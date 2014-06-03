jsb ../Sources/main.js capsule.js

java -client -d32 -jar C:\CLOSURE\compiler.jar ^
--js capsule.js ^
--js_output_file capsule.min.js
