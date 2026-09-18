FieldSketch — V.R.S. Vithana (Project Edition)
==============================================

GitHub Pages update
-------------------
1. https://github.com/surangagit/fieldsketch open කරන්න.
2. Add file > Upload files තෝරන්න.
3. මේ files තුන repository root එකට upload කර existing files replace කරන්න:
   - index.html
   - app.js
   - sw.js
4. Commit message: FieldSketch project edition
5. Commit changes ඔබන්න.
6. මිනිත්තු 1–3කට පසු https://surangagit.github.io/fieldsketch/ open කරන්න.
7. පරණ version එකක් පෙනේ නම් app/browser එක close කර නැවත open කරන්න.
   තවමත් පරණ version නම් Chrome Site Settings තුළ surangagit.github.io site data clear කරන්න.

Main workflow
-------------
- Project එකක් create/open නොකර drawing හෝ survey කළ නොහැක.
- Project එකේ සියලු layers, features, point codes, locks සහ attributes autosave වේ.
- Project tab > Backup මඟින් සම්පූර්ණ portable .fieldsketch.json backup එක ගන්න.
- එම backup එක Import Project මඟින් වෙනත් device එකක open කළ හැක.

Map
---
- Feature type සහ destination layer තෝරා Draw කරන්න.
- Parcel/Building polygon එක Finish කළ විට target extent සහ Auto fit ON නම් preview ලැබේ.
- Vertices default unlocked වේ. Draft vertex එක tap කර lock/unlock කළ හැක.
- Lock new vertices ON කළ විට අලුතින් එකතු කරන vertices red/locked වේ; Auto Fit ඒවා වෙනස් නොකරයි.
- Existing feature එක Select කර Edit මඟින් geometry edit කළ හැක.
- Trace Boundary: existing visible snap layer එකේ start සහ end point tap කළ විට අතර geometry auto-copy වේ.
- Area Split: selected unlocked polygon එක Parallel Line හෝ Pivot Rotate method එකෙන් split කළ හැක.
- Split preview: Keep Target (default), Swap Side, Keep Remainder, Keep Both.

Survey
------
- Survey Method එකෙන් Point, Line, Polyline හෝ Polygon තෝරන්න.
- Add GPS Position හෝ Mark on Map මඟින් current survey session එකට අවශ්‍ය points පමණක් එකතු කරන්න.
- Survey session readout එක line length හෝ polygon area පෙන්වයි.
- Finish Geometry මඟින් එම session එකේ points පමණක් join කර feature එක save කරයි.
- Join Selected Points / Boundary Lines මඟින් map එකේ අවශ්‍ය saved points/lines order එකට තෝරා Polyline හෝ Polygon සාදන්න. සියලු points auto-join නොවේ.
- Map / Subdivide මඟින් අවසන් කළ polygon එක Map tab එකේ select කර area tools භාවිත කළ හැක.
- +Code මඟින් add කරන codes සියලු projects අතර auto-save වේ.
- GPS Boundary Walk: Start, optional Record, Stop & Join.
- WGS84 සහ SLD99 coordinates Survey table සහ CSV export දෙකේ ඇත.

Layers
------
- Eye: show/hide.
- Magnet: snapping on/off.
- Lock: layer edit/split/delete lock.
- Up arrow: export include/exclude.
- Three dots: rename, colour, delete.
- KML සහ DXF import කළ විට original layer structure හැකි තරම් තබාගනී.
- Imported DXF coordinates SLD99 / EPSG:5235 ලෙස සලකයි.
- KML coordinates WGS84 ලෙස සලකයි.
- Roads, streams, footpaths සහ custom features LineString ලෙස භාවිත කළ හැක.

Project export/share
--------------------
- Backup: complete FieldSketch project JSON.
- KML: WGS84, export-enabled visible layers.
- DXF: SLD99 / EPSG:5235 metres.
- CSV: WGS84 Lat/Lon + SLD99 E/N.
- Share: phone share sheet හරහා WhatsApp, Gmail, Drive වැනි apps.

Data safety
-----------
- Autosave browser/device storage තුළ වේ.
- Browser site data clear කළොත් local projects මැකිය හැක.
- වැදගත් project එකක් අවසන් කළ සෑම අවස්ථාවකම Project Backup export කරන්න.
- GPS සඳහා GitHub Pages HTTPS link එක භාවිත කරන්න.
