Field Sketch v2 — GitHub Pages නැවත Deploy කිරීම
================================================

මෙම ZIP file එක extract කළ විට files 4ක් ලැබේ:
  1. index.html
  2. app.js
  3. sw.js
  4. README_DEPLOY_SINHALA.txt

GitHub එකෙන් update කරන ක්‍රමය
-----------------------------
1. Phone/PC browser එකෙන් මේ repository එක open කරන්න:
   https://github.com/surangagit/fieldsketch

2. Repository එකේ main branch එක සහ root folder එක open කරගන්න.

3. Add file > Upload files තෝරන්න.

4. ZIP එක upload නොකර, ZIP එක extract කර ලැබුණු මේ files 3 upload කරන්න:
   index.html, app.js, sw.js

5. දැනට repository එකේ තිබෙන එකම නම් ඇති files replace වන බව බලන්න.

6. Commit changes යටතේ message එකට:
   Field Sketch v2 update
   කියලා දාලා Commit changes ඔබන්න.

7. Repository Settings > Pages වෙත ගොස්:
   Source: Deploy from a branch
   Branch: main
   Folder: / (root)
   තෝරා Save කරන්න. (දැනටමත් මේ settings තිබේ නම් වෙනස් කරන්න අවශ්‍ය නැහැ.)

8. මිනිත්තු 1–3කට පසුව මේ link එක open කරන්න:
   https://surangagit.github.io/fieldsketch/

Phone එකේ පරණ version එක පෙන්වන්නේ නම්
--------------------------------------
1. App/PWA එක සම්පූර්ණයෙන් close කර නැවත open කරන්න.
2. Chrome page එකේ menu > Reload ඔබන්න.
3. තවමත් පරණ version නම් Chrome Settings > Site settings > All sites >
   surangagit.github.io > Clear & reset කර link එක නැවත open කරන්න.
4. Home screen එකට install කර තිබේ නම් අවශ්‍ය වුණොත් old shortcut/app එක remove කර,
   new link එකෙන් Add to Home screen කරන්න.

Coordinate systems
------------------
- KML import/export: WGS84 geographic coordinates.
- DXF import/export: SLD99 / Sri Lanka Grid 1999, EPSG:5235, metres.
- Coordinate CSV: WGS84 Lat/Lon සහ SLD99 Easting/Northing දෙකම.

වැදගත්
-------
- Job data browser එකේ මේ device එකේ save වේ. Browser site data clear කළොත් jobs මැකේ.
- වැදගත් job එකකට KML, DXF සහ Coordinate CSV backup තබාගන්න.
- GN Division/reference KML එක "Add GN/reference KML" මඟින් overlay කළ හැක.
- Snap වී ඇති red vertices Fit to Extent කිරීමේදී වෙනස් නොවේ.
- Split කිරීමට මුලින් current polygon එක draw කරන්න, නැත්නම් saved polygon එක Pan mode එකේ tap කර edit සඳහා open කරන්න.
