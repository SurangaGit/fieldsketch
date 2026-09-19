FieldSketch — V.R.S. Vithana
Field Edition 7
===========================

මෙය GitHub Pages මත ධාවනය කරන field sketch application එකකි.
Field assistant කෙනෙකුට polygon එක ඇඳීම, ඉඩමේ විස්තර සටහන් කිරීම,
නියමිත extent එකට subdivision කිරීම සහ project එක රැගෙන යාම ප්‍රධාන workflow එකයි.

1. GitHub එකට upload කිරීම
-------------------------
පළමුව පැරණි app එකේ වැදගත් සෑම job එකක්ම Project → Save backup / Export project
මඟින් download කරගන්න. Browser site data clear කරන්න එපා.

ZIP එක extract කර පහත files පහම repository එකේ දැනට index.html තියෙන folder එකට දාන්න:
  index.html
  app.js
  geometry.js       (අලුත් file එක)
  styles.css        (අලුත් file එක)
  sw.js

GitHub → surangagit/fieldsketch → Add file → Upload files.
ZIP file එක පමණක් upload කිරීමෙන් app එක update වෙන්නේ නැහැ.
Files පහම එකම commit එකකින් replace/add කර Commit changes කරන්න.
දැනට GitHub Pages deploy වන branch/folder එකම භාවිත කරන්න.
Settings → Pages යටතේ publishing source එක සහ Actions deployment result එක බලන්න.
Custom build step එකක් හෝ npm install එකක් අවශ්‍ය නැහැ.
README සහ tests folder එක publish කිරීම අත්‍යවශ්‍ය නැහැ.

Deployment success වූ පසු:
  https://surangagit.github.io/fieldsketch/?v=7

Desktop: Ctrl+Shift+R මඟින් reload කරන්න.
Phone: පැරණි tab එක වසා ඉහත link එක අලුත් tab එකකින් open කරන්න.
Header එකේ “Field Edition 7” තිබේද බලන්න.
තවමත් පරණ UI එක නම් GitHub deployment success වී තිබේද මුලින් බලන්න.
Desktop DevTools → Application → Service Workers → Unregister කර reload කළ හැක.
Clear storage / Clear site data භාවිත කරන්න එපා; එයින් local projects නැතිවිය හැක.

මම GitHub repository එකට මේ files publish කර නැහැ. මෙය upload කිරීමට සූදානම් package එකයි.

2. සරල field workflow
---------------------
• ඉහළ project button → Create project හෝ Open project.
• Field tab එකේ default Geometry = Polygon / Parcel, input = Pick on map.
• Boundary vertices map එකේ tap කරන්න.
• තුන්වන vertex එකෙන් පටන් area සජීවීව Acre / Rood / Perch, m² සහ ha වලින් පෙනේ.
• Mouse භාවිතයේ cursor preview වෙනම පෙන්වයි. Phone එකේ සෑම tap එකකටම area update වේ.
• Current location button එක optional GPS vertex එකක් record කරයි.
  Map එකේ ◎ button එක location පෙන්වයි; vertex record කරන්නේ නැහැ.
• Parcel number, land name, claimant, GN/village සහ remarks ඇතුළත් කරන්න.
• Save → එක joined polygon feature එකක් save වේ.
• පළමු vertex එකට endpoint snap කර close කිරීමත් පුළුවන්.
• Polygon ඇතුළේ parcel number, remarks සහ extent label පෙනේ.
• Next parcel සඳහා New sketch.
• දකුණු පැත්තේ ⌄ button එකෙන් control panel එක හකුළා map එක විශාල කළ හැක.

Line / Polyline / Point ද Field එකේ Geometry selector එකෙන් තෝරාගන්න.
Line එකකට vertices දෙකයි. Polyline එකකට vertices කිහිපයක් ගන්න පුළුවන්.
Advanced tab එකෙන් feature type, destination layer සහ optional point code සකස් කරන්න.
Road, Footpath, Stream, Drain, Fence ආදිය Line / Polyline features ලෙස save කරන්න.
Code list එකට අලුත් codes එකතු කළ හැකි අතර device එකේ auto-save වේ.

3. OSNAP සහ shared boundary
---------------------------
OSNAP ON default ය. පරණ drawn features, imported KML සහ SLD99 DXF වලට snap වේ.
Auto: Endpoint → Intersection → Nearest ප්‍රමුඛතාවය.
Advanced → Object snap තුළ End, Intersection, Nearest, Midpoint,
Perpendicular from last vertex වෙන වෙනම තෝරාගත හැක.
Touch tolerance 18 / 28 / 40 pixels; default 28 px.
Dense drawing එකක වැරදි endpoint එකක් ඇදගන්නවා නම් zoom in කර
Nearest only හෝ අවශ්‍ය snap mode එක තෝරාගන්න.

Snap marker:
  Square = endpoint/node
  × = intersection
  Diamond = nearest
  Triangle = midpoint
  L = perpendicular

Map click එකෙන් snap වුණු exact coordinate එකම draft එකට එකතු වේ.
Endpoint එක වෙනුවට ළඟම segment projection එක තෝරාගත් පැරණි දෝෂය සකස් කර ඇත.
Layers → Show ON සහ Snap ON දෙකම තිබිය යුතුය.
Protected feature/layer එකකට snap කළ හැක; hidden layer එකකට snap වෙන්නේ නැහැ.

Shared boundary button:
  1) Polygon හෝ Polyline mode තෝරන්න.
  2) Shared boundary → පැරණි boundary එකේ START tap කරන්න.
  3) එහි END tap කරන්න.
  4) Highlight වූ route එක බලන්න.
  5) Closed polygon එකක Swap side / route මඟින් අනෙක් මාර්ගය බලන්න.
  6) Use boundary → අතරමැදි bends සියල්ල copy වේ.
  7) අලුත් boundary එකේ ඉතිරි කොටස අඳින්න → Save.

එකිනෙකට සම්බන්ධ DXF LINE features කිහිපයක් හරහාත් shortest connected route එක ගත හැක.
Junction සහ intersection හරහා route එක යයි. 5 mm ඇතුළත endpoints coincident ලෙස සලකයි.
වෙනම features අතර gaps ස්වයංක්‍රීයව bridge කරන්නේ නැහැ.
Route එක review කිරීම වැදගත්: road network එකක shortest route එක
ඔබට අවශ්‍ය parcel boundary එකම විය යුතු නැහැ.
Source KML / DXF boundary එක කිසිවිටක trace කිරීමෙන් වෙනස් නොවේ.
Draft එකේ අවසාන vertex එකෙන් trace start එක දුර නම් connecting edge එකට ඔබෙන් අසයි.

4. නියමිත extent එකට Subdivision
--------------------------------
අඳින polygon එක Save කරන්න, නැතිනම් Select saved parcel මඟින් polygon එකක් තෝරන්න.
Required extent එක A / R / P ලෙස දාන්න.
A සහ R whole numbers; R = 0–3, P = 0–39.99.
Target එක parcel එකට වඩා කුඩා, zero වලට වැඩි extent එකක් විය යුතුය.
Subdivide button එක Field/map workflow එකේම ඇත.

Parallel moving line:
  • Polygon එක cross වන line එකකට points දෙක tap කරන්න.
  • Target extent එක තබන්න ඕනෑ පැත්තේ polygon එක ඇතුළත tap කරන්න.
  • Line එක එම direction එකේම parallel move වී target area එක සොයාගනී.
  • Amber / purple preview එකේ extent දෙකම බලන්න.

Rotate from vertex:
  • Highlight කළ polygon vertex එකක් pivot ලෙස tap කරන්න.
  • Pivot සිට polygon ඇතුළට යන line direction එකට දෙවන point එක tap කරන්න.
  • අවශ්‍ය පැත්තේ polygon එක ඇතුළත tap කරන්න.
  • Pivot එක නොවෙනස්ව line එක rotate වී target area එක සොයාගනී.

Preview options:
  Swap side / route = අනෙක් පැත්ත target extent එක බවට ගණනය කරන්න.
  Keep selected = amber කොටස තබා purple කොටස ඉවත් කරන්න.
  Keep other = purple කොටස තබා amber කොටස ඉවත් කරන්න.
  Keep both = කොටස් දෙකම parcels දෙකක් ලෙස තබන්න.
  Cancel = මුල් polygon එක නොවෙනස්ව තබන්න.
  Save වූ subdivision එකත් Undo මඟින් මුල් polygon එකට ගෙන යා හැක.

Shared boundaries subdivision කිරීමේදී scale කරන්නේ නැහැ.
Target එකට ගෙන ඒමට cut line එක move / rotate වේ.
Advanced → Scale a free sketch to extent පහසුකම unsnapped, survey-created
polygon එකකට පමණයි. Imported/traced/snapped boundaries ඇති polygon සඳහා Subdivide භාවිත කරන්න.

5. Edit / Join / Layers
-----------------------
Advanced → Move vertices: vertex drag කරන අතර area update වේ; ඉන්පසු Save.
Add vertex: edge එකට tap කරන්න. Delete vertex: අවශ්‍ය vertex එකට tap කරන්න.
Undo / Redo සහ Cancel draft ඇත. Vertex locks නැහැ.
Whole feature එක optional Protect කළ හැක; එවිට edit / subdivision අවහිර වේ.
අදාළ layer එක Protect කළත් එම බලපෑම ඇත.

Join selected saved boundaries:
  Advanced → Join selected saved boundaries → Select lines.
  අවශ්‍ය saved lines පමණක් joining order එකට tap කරන්න.
  Finish join → draft එක review කරන්න → Save.
  Polygon එකක් හදනවා නම් closing line එකත් තෝරන්න.
  Source lines එලෙසම තබා නව joined feature එක සාදයි.

Layers:
  KML folders සහ DXF layer names අනුව reference layers සෑදේ.
  Show, Snap, Protect සහ Export වෙන වෙනම controls.
  Rename සහ Zoom ඇත. අලුත් layers හදන්නත් පුළුවන්.
  Saved features list එකෙන් select/zoom, extent සහ land attributes බලන්න.
  Imported references default Export OFF; project backup තුළ ඒවා හැමවිටම ඇත.
  Hidden වූ layer එකත් Export ON නම් export වේ.

6. Project / export / share
---------------------------
සෑම වැඩක්ම project එකක් ඇතුළේ සිදු වේ.
Saved features, reference layers, attributes, target සහ unfinished draft එක
local device/browser එකේ auto-save වේ.
පැරණි v3 projects එකම storage key එකෙන් load කරයි; v2 jobs migrate කිරීමට support ඇත.
Project → Save backup මඟින් සම්පූර්ණ .fieldsketch.json download කරගන්න.
Import project backup → references ඇතුළු project එක නැවත restore වේ.
Backup import නව project එකක් ලෙස එකතු කරයි; පැරණි project එක overwrite නොවේ.
Undo history reload එකෙන් පසු නැවත නොලැබේ. Saved geometry/draft එක ලැබේ.

KML export: WGS84 longitude, latitude; folders/layers, polygons, holes, paths,
points සහ parcel attributes ඇතුළත් වේ.
DXF export: SLD99 / EPSG:5235 Easting, Northing, metres; closed POLYLINE,
POINT සහ parcel labels. R2000 ASCII format.
CSV: WGS84 + SLD99 coordinates, layer, land fields, vertex source/accuracy සහ area.
Share project: phone share sheet තිබේ නම් WhatsApp/Gmail වැනි installed apps වෙත
backup attach කළ හැක. Share sheet නොමැති browser එකක file download වේ.

7. GPS / coordinate / format සීමා
---------------------------------
Area සහ lengths SLD99 grid metres වලින් ගණනය වේ.
1 perch = 25.29285264 m². 40 perches = 1 rood; 160 perches = 1 acre.
Grid area = measured outline එකේ plan area; terrain slope correction නොවේ.
මෙය Sri Lanka field sketch workflow එක සඳහාය.

Phone GPS සහ satellite imagery survey control/RTK වෙනුවට නොවේ.
Captured GPS accuracy එක record වේ. Poor accuracy වූ single fix සඳහා confirmation එකක් ඇත.
GPS boundary walk එක poor fixes skip කර minimum spacing අනුව vertices ගනී.
EPSG SLD99↔WGS84 default datum transformation එක භාවිත කරයි.
එහි published transformation accuracy 14 m ලෙස සඳහන් බැවින්,
වෙනස් sources එකට align කරන විට known control points වලින් තහවුරු කරන්න.
Displayed decimal places physical survey accuracy එක කියන්නේ නැහැ.
SLD99 grid coordinates re-export කිරීමේදී numerical inverse refinement භාවිත කරයි.

Import DXF: ASCII LINE, POINT, straight LWPOLYLINE / POLYLINE support.
ARC, CIRCLE, SPLINE, bulges, INSERT/blocks, meshes, nonstandard extrusion වැනි
unsupported entities report කර skip කරයි. CAD එකේ අවශ්‍ය නම් straight polylines
වලට convert/explode කර SLD99 metres වලින් export කරන්න.
DXF file එකේ coordinate values බලා වෙනත් CRS එකක් නිශ්චිතව හඳුනාගත නොහැක.
SLD99 ලෙසම සකස් කළ DXF එකක් දෙන්න; Kandawala / UTM / arbitrary local grid නොදෙන්න.
DXF text/Sinhala rendering CAD fonts සහ Unicode support අනුව වෙනස් විය හැක.

KML outer rings සහ holes view/export/snap කළ හැක.
Hole සහිත polygon edit/subdivide කිරීම මේ version එකේ support නොවේ.
Concave polygon cut එකෙන් disconnected pieces හැදේ නම් cut එක reject කර
මුල් geometry එක තබයි; වෙනත් cut direction එකක් තෝරන්න.
KMZ compression, KML network links, curved boundaries support නොවේ.
Browser background වූ විට phone GPS walk pause විය හැක; screen එක active තබන්න.

Internet ඇති විට app එක මුලින් සම්පූර්ණයෙන් load කරන්න.
Required app files cache වූ පසු offline app use කළ හැක.
Imagery සඳහා internet අවශ්‍යය; කලින් බැලූ cached tiles සීමිත ප්‍රමාණයක් පවතී.
Offline imagery availability guarantee කරන්නේ නැහැ.
Device/browser මාරු කිරීමෙන් jobs ස්වයංක්‍රීයව sync වෙන්නේ නැහැ; backup import කරන්න.
Local storage full/blocked නම් SAVE FAILED පණිවිඩය පෙන්වයි; වහා backup export කරන්න.
දැනට තිබූ licence/trial workflow එක මෙම update එකේද පවතී.

8. කළ පරීක්ෂණ සහ field check
---------------------------
Automated checks:
  13 geometry test groups (parallel/rotation area, shared endpoints, OSNAP,
     self-crossing rejection, trace junctions, polygon label placement).
  17 isolated app test groups (draft save/reload, project isolation,
     exact source snapping, imported references, split/undo, edit, join,
     KML/DXF/CSV export, stale GPS callback and inverse refinement).
  4 platform checks (HTML bindings/assets, complete offline shell,
     app-scoped cache cleanup, offline navigation).
  Independent ezdxf export audit: 0 errors, 0 repairs; metre units and vertices verified.
  Independent lxml KML check: XML, namespace, escaped attributes verified.

App tests use DOM/Leaflet/coordinate-conversion test doubles, not a real browser.
They do not establish absolute CRS accuracy or real phone GPS/touch behaviour.
Real browser rendering, live CDN load, AutoCAD/Google Earth display,
phone GPS and field accuracy were NOT run in this environment.

Test source is included under tests/.
From the extracted folder:
  node tests/geometry.test.cjs
  node tests/app.test.cjs
  node tests/platform.test.cjs
  python tests/verify_exports.py
Node 20+ and Python with lxml/ezdxf are required for the full test suite.
No test dependencies are required by the deployed app.

Before field use:
  • Phone එකෙන් sample project හදා tap/drag/Undo/Save/reload බලන්න.
  • Known-control KML හා SLD99 DXF import කර එකම corner එකේ alignment බලන්න.
  • Endpoint/nearest/intersection snaps සහ shared-boundary preview බලන්න.
  • Known rectangle එකකට parallel/rotate split කර exported DXF හි extent බලන්න.
  • GPS permission දී accuracy readout සමඟ point එක capture කරන්න.
  • Backup වෙනත් browser/device එකක import කර references/remarks තිබේද බලන්න.

Reference documentation:
  https://leafletjs.com/reference.html
  https://proj4js.org/
  https://epsg.io/5235
  https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
