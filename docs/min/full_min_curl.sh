HOST='http://localhost:9000/api/min/submissions'
HOST='https://httpbin.org/post'
curl $HOST  -H 'Cookie: csrftoken=qlSe4v52maq1kI8DEMHN5MrFBlzw23gB; sessionid=pwiynycpqguc1y9bjub6by9fhzvyb5l0; _gat=1; _ga=GA1.1.2078390005.1465922517' -H 'Origin: http://localhost:9000' -H 'Accept-Encoding: gzip, deflate' -H 'Accept-Language: en-US,en;q=0.8' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6IndoYXJkaW5nQGF2YWxhbmNoZS5jYSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJjbGllbnRJRCI6Im1jZ3pnbGJGazJnMU9jak9mVVpBMWZycWpaZGNzVmdDIiwidXBkYXRlZF9hdCI6IjIwMTYtMDktMDJUMjI6NDc6MDcuODQ4WiIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci8xMDk3Yjc3MzJlMDUwMzljNTI3NDNlYzY5OGMwZjAzZT9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRndoLnBuZyIsInVzZXJfaWQiOiJhdXRoMHw1NWFmYzdiN2Q0Mzk1OTNjNzU5YTlkOTYiLCJuYW1lIjoid2hhcmRpbmdAYXZhbGFuY2hlLmNhIiwibmlja25hbWUiOiJ3aGFyZGluZyIsImlkZW50aXRpZXMiOlt7InVzZXJfaWQiOiI1NWFmYzdiN2Q0Mzk1OTNjNzU5YTlkOTYiLCJwcm92aWRlciI6ImF1dGgwIiwiY29ubmVjdGlvbiI6IlVzZXJuYW1lLVBhc3N3b3JkLUF1dGhlbnRpY2F0aW9uIiwiaXNTb2NpYWwiOmZhbHNlfV0sImNyZWF0ZWRfYXQiOiIyMDE1LTA3LTIyVDE2OjQxOjI3LjYyMloiLCJsYXN0X3Bhc3N3b3JkX3Jlc2V0IjoiMjAxNS0wOC0xMFQyMDoxMTozNy4xOTFaIiwiYXBwX21ldGFkYXRhIjp7InJvbGVzIjpbIkZPUkVDQVNURVIiXX0sInJvbGVzIjpbIkZPUkVDQVNURVIiXSwiaXNzIjoiaHR0cHM6Ly9hdmFsYW5jaGVjYS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NTVhZmM3YjdkNDM5NTkzYzc1OWE5ZDk2IiwiYXVkIjoibWNnemdsYkZrMmcxT2NqT2ZVWkExZnJxalpkY3NWZ0MiLCJleHAiOjE0NzI4OTI0MjcsImlhdCI6MTQ3Mjg1NjQyN30.pTgJrLqNBhOpJ5xXGYA0En19JRzdnPwd6vJMvIy-0oI' -H 'Content-Type: multipart/form-data; boundary=----WebKitFormBoundary3xjCRMWD876BwE0J' -H 'Accept: application/json, text/plain, */*' -H 'Referer: http://localhost:9000/submit' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36' -H 'Connection: keep-alive' --data-binary $'------WebKitFormBoundary3xjCRMWD876BwE0J\r\nContent-Disposition: form-data; name="title"\r\n\r\nTest for Karl\r\n------WebKitFormBoundary3xjCRMWD876BwE0J\r\nContent-Disposition: form-data; name="datetime"\r\n\r\n2016-09-02T15:47:00-07:00\r\n------WebKitFormBoundary3xjCRMWD876BwE0J\r\nContent-Disposition: form-data; name="latlng"\r\n\r\n["48.80686","-81.29883"]\r\n------WebKitFormBoundary3xjCRMWD876BwE0J\r\nContent-Disposition: form-data; name="file0"; filename="msykmohxox4buoeuvp2y.jpg"\r\nContent-Type: image/jpeg\r\n\r\n\r\n------WebKitFormBoundary3xjCRMWD876BwE0J\r\nContent-Disposition: form-data; name="obs"\r\n\r\n{"quickReport":{"ridingConditions":{"ridingQuality":{"prompt":"Riding quality was:","type":"single","options":["Amazing","Good","OK","Terrible"],"selected":"Amazing"},"snowConditions":{"type":"multiple","prompt":"Snow conditions were:","options":{"Crusty":true,"Powder":false,"Deep powder":true,"Wet":false,"Heavy":false,"Wind affected":false,"Hard":false}},"rideType":{"type":"multiple","prompt":"We rode:","options":{"Mellow slopes":true,"Steep slopes":false,"Convex slopes":true,"Sunny slopes":false,"Cut-blocks":false,"Open trees":false,"Dense trees":false,"Alpine slopes":false}},"stayedAway":{"type":"multiple","prompt":"We stayed away from:","options":{"Steep slopes":true,"Convex slopes":false,"Sunny slopes":false,"Cut-blocks":true,"Open trees":false,"Alpine slopes":false}},"weather":{"type":"multiple","prompt":"The day was:","options":{"Stormy":true,"Windy":false,"Sunny":true,"Cold":false,"Warm":true,"Cloudy":false,"Foggy":false,"Wet":false}}},"avalancheConditions":{"slab":true,"sound":true,"snow":false,"temp":false},"comment":"Comment for Quick"},"avalancheReport":{"avalancheOccurrenceEpoch":"2016-09-02","avalancheOccurrenceTime":"3:48 PM","avalancheObservation":"12 hrs ago","avalancheNumber":"6-10","avalancheSize":"1","slabThickness":20,"slabWidth":20,"runLength":null,"avalancheCharacter":{"Storm slab":false,"Wind slab":false,"Persistent slab":false,"Deep persistent slab":false,"Wet slab":false,"Cornice only":false,"Cornice with slab":false,"Loose wet":false,"Loose dry":false},"triggerType":null,"triggerSubtype":"Remote","triggerDistance":34,"startZoneAspect":{"N":true,"NE":false,"E":true,"SE":false,"S":false,"SW":false,"W":false,"NW":false},"startZoneElevationBand":{"Alpine":true,"Treeline":false,"Below treeline":false},"startZoneElevation":100,"startZoneIncline":80,"runoutZoneElevation":1200,"weakLayerBurialDate":"2016-09-02","weakLayerCrystalType":{"Surface hoar":true,"Facets":false,"Surface hoar and facets":false,"Depth hoar":true,"Storm snow":false},"crustNearWeakLayer":"No","windExposure":"Lee slope","vegetationCover":"Open slope","avalancheObsComment":"Avalanche Comments"},"incidentReport":{"groupActivity":{"Snowmobiling":false,"Skiing":false,"Climbing/Mountaineering":true,"Hiking/Scrambling":true,"Snowshoeing":true,"Tobogganing":false,"Other":false},"otherActivityDescription":"Snow Angels","groupSize":2,"numberFullyBuried":1,"numberPartlyBuriedImpairedBreathing":31,"numberPartlyBuriedAbleBreathing":1,"numberCaughtOnly":1,"numberPeopleInjured":1,"terrainShapeTriggerPoint":"Convex","snowDepthTriggerPoint":"Variable","terrainTrap":{"No obvious terrain trap":false,"Gully or depression":true,"Slope transition or bench":false,"Trees":false,"Cliff":true},"incidentDescription":"TEST INCIDENT COMMENT","numberInvolved":35},"snowpackReport":{"snowpackObsType":"Point observation","snowpackSiteElevation":1200,"snowpackSiteElevationBand":{"Alpine":true,"Treeline":false,"Below treeline":false},"snowpackSiteAspect":{"N":false,"NE":false,"E":false,"SE":false,"S":false,"SW":true,"W":false,"NW":true},"snowpackDepth":200,"snowpackWhumpfingObserved":"Yes","snowpackCrackingObserved":"No","snowpackSurfaceCondition":{"New snow":true,"Crust":false,"Surface hoar":true,"Facets":false,"Corn":false,"Variable":false},"snowpackFootPenetration":15,"snowpackSkiPenetration":15,"snowpackSledPenetration":100,"snowpackTestInitiation":"Moderate","snowpackTestFracture":"Sudden (\\"pop\\" or \\"drop\\")","snowpackTestFailure":15,"snowpackTestFailureLayerCrystalType":{"Surface hoar":false,"Facets":false,"Depth hoar":false,"Storm snow":false,"Crust":true,"Other":false},"snowpackObsComment":"Snowpack comment"},"weatherReport":{"skyCondition":"Scattered clouds (2/8-4/8)","precipitationType":"Mixed snow & rain","snowfallRate":15,"rainfallRate":"Drizzle","temperature":-20,"minTemp":0,"maxTemp":0,"temperatureTrend":"Rising","newSnow24Hours":25,"precipitation24Hours":50,"stormSnowAmount":100,"stormStartDate":"2016-09-02","windSpeed":"Moderate (26-40 km/h)","windDirection":"E","blowingSnow":"Moderate","weatherObsComment":null}}\r\n------WebKitFormBoundary3xjCRMWD876BwE0J\r\nContent-Disposition: form-data; name="tempLatlng"\r\n\r\n48.80686,-81.29883\r\n------WebKitFormBoundary3xjCRMWD876BwE0J--\r\n' --compressed