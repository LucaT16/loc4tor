# loc4tor

Der loc4tor ist eine KI, welche Sehenswürdigkeiten auf Bildern erkennt. 
Die folgenden Sehenwürdigkeiten kann der loc4tor erkennen:
* Big Ben
* Brandenburger Tor
* Eiffelturm
* Freiheitsstatue
* Golden Gate Bridge
* Akropolis
* Buckingham Palace
* Colosseum
* Mannheimer Wasserturm

**Table of contents**

1. [Structure](#structure)
   - [Frontend](#frontend)
   - [PythonScripts](#python)
   - [Bilder](#bilder)
2. [Installation](#installation)
3. [Development setup](#development-setup)
   - [Voraussetzungen](#voraus)
   - [Bilder generieren](#bildgen)
   - [Datenset generieren](#dataset)
   - [Model trainieren & testen](#trainmodel)
   - [Optional: Trainiertes Model in JSON konvertieren](#conv)
4. [Contributing](#contributing)

## <a name="structure"></a> Structure

Das Repository teilt sich in die 3 Bereiche: Frontend, PythonScript und Bilder.

<a name="frontend"></a> **Frontend**

Der frontend-Ordner beinhaltet die Webanwendung des loc4tor. Neben den standartmäßigen Dateien für eine Website befindet sich hier auch das trainierte Tensorflow-CNN-Model als JSON-Datei.

<a name="python"></a> **PythonScripts**

PythonScripts beinhaltet zum einen das Jupyter-Notebook des loc4tor. In diesem Notebook wird das CNN-Model mithilfe von Tensorflow und Keras erstellt und trainiert. Darüber hinaus enthält der Ordner zwei weitere Python-Skripts `ScaleImages.py` und `CreateDataset.py`.

Das Skript `ScaleIamges.py` loopt über die Ordner der Sehenswürdigkeiten, welche sich im Bilder-Ordner befinden. Das Skript rotiert diese Bilder zehn mal zufällig und speichert sie, um den Datensatz der Bilder zu erhöhen.

Das Skript `CreateDataset.py` generiert aus den im vorherigen Skript erstellten Bildern zwei binäre Pickle-Dateien, welche im loc4tor-Notebook als Tranings- bzw. Testdaten verwendet werden können.

<a name="bilder"></a> **Bilder**

Im Bilder-Ordner befinden sich die Basis-Bilder der Sehenswürdigkeiten. Diese werden benötigt um das Datenset des Models zu generieren.

## <a name="installation"></a> Installation

Um die Website und die Funktionalität der KI zu testen muss der Frontend-Ordner auf dem localhost gehostet werden. Hierfür bietet sich bspw. [XAMPP](https://www.apachefriends.org/de/download.html) an.

Um die Website zu hosten, muss lediglich der frontend-Ordner in das htdocs-Verzeichnis von XAMPP kopiert werden, dann ist sie unter http://localhost:8080/frontend/ erreichbar und verwendbar. Eine Anleitung zum Einrichten von XAMPP finden sie [hier](https://wiki.selfhtml.org/wiki/Webserver/lokal_einrichten).

## <a name="development-setup"></a> Development setup

Um selbst am Model zu arbeiten oder Änderungen vorzunehmen sind eine Reihe an Schritten notwendig.

### <a name="voraus"></a> 1. Voraussetzungen

Für das Verwenden des Jupyter-Notebooks ist eine Anaconda-Umgebung mit bestimmten Modulen bzw. Paketen notwendig.
Folgende Module/Pakete werden für die Verwendung des Juypter-Notebooks, sowie den Python Skripts benötigt:
* Python
* Tensorflow
* matplotlib
* scikit-learn
* numpy
* opencv
* pillow

#### <a name="bildgen"></a> 2. Bilder generieren

Da weder die Pickle-Dateien, noch die rotierten Bilder in diesem Repo hochgeladen werden (aus speicher-technischen Gründen), müssen zunächst die notwenigen Bilder für das Datenset generiert werden. Navigiere hierfür in das Verzeichnis loc4tor/PythonScripts und führe das Skript `ScaleImages.py` aus:

```
$ python ScaleImages.py
```
oder
```
$ python3 ScaleImages.py
```

Das Skript loopt über die Verzeichnisse der Sehenswürdigkeiten im Ordner `Bilder` und erstellt jeweils ein weiteres Verzeichnis mit dem Namen der Sehenswürdigkeit mit dem Suffix "Cropped". Anschließend loopt das Skript über alle sich in den Verzeichnis befindlichen Bilder und rotiert diese zehn mal in einem zufälligen Winkel. Diese Bilder werden in den `Cropped` Verzeichnissen gespeichert. Auf diese Weise erhöht sich der Datensatz von etwa 400 Bildern pro Ort auf 4000+ Bilder pro Ort.

#### <a name="dataset"></a> 3. Datenset generieren

Ist das `ScaleImages.py` Skript durchlaufen, kann nun das Skript `CreateDataset.py` ausgeführt werden:

```
$ python CreateDataset.py
```
oder
```
$ python3 CreateDataset.py
```

In `CreateDataset.py` wird über werden die im vorherigen Skript generierten Bilder zusammen mit dem dazugehörigen Label (also um welche Sehenswürdigkeit es sich handelt) im Array `training_data[]` gespeichert. Dieses wird anschließend durchmischt, sodass die Bilder der Sehenswürdigkeiten in zufälliger Reihenfolge im Array vorhanden sind. Dies bewirkt, dass das Model später beim Trainieren nicht zuerst eine Sehenswürdigkeit trainiert, dann die nächste usw.

Anschließend wird über `training_data` geloopt, um die Bilder und die dazugehörigen Label in verschiedene Arrays zu speichern. Aus diesen Array werden dann die Dateien `x.pickle` und `y.pickle` generiert. `x.pickle` beinhaltet alle Bilder der Datensets und `y.pickle` die Label der Bilder in gleicher Reihenfolge.

#### <a name="trainmodel"></a> 4. Model trainieren & testen

Ist das Datenset in Form der Pickle-Dateien erstellt, kann das Model trainiert und getestet werden. Hierfür muss das Notebook `loc4tor.ipynb` in Jupyter-Notebook geöffnet werden. Das Notebook beinhaltet alle notwendigen Schritte, um das Model zu erstellen, trainieren und testen zu können. Anpassungen können in den einzelnen Schritten individuell vorgenommen werden.

#### <a name="conv"></a> 5. Optional: Trainiertes Model in JSON konvertieren

Um das neu trainierte Model für die Website zu verwenden, muss dieses zunächst gespeichert werden. Hierfür ist der letzte Codeblock des Notebooks auszuführen. Dieser speichert das trainierte Model im Verzeichnis *loc4tor/PythonScripts/models/loc4tor/1* zusammen mit den Gewichten.

Um das Model in eine für die Website lesbare JSON-Datei zu konvertieren wird Tensorflow.js benötigt. Dies kann mithilfe von npm in der Konsole oder im Terminal installiert werden:

```
$ npm install @tensorflow/tfjs
```

Ist TensorflowJS installiert kann der mitgebrachte tensorflowjs_converter verwendet werden, um das Model zu konvertieren. Hierfür muss folgender Konsolenbefehl ausgeführt werden:

````
$ tensorflowjs_converter --input_format=tf_saved_model /path/to/repo/loc4tor/PythonScripts/models/loc4tor/1 /path/to/repo/loc4tor/Frontend/js/model
````

Die Option --input_format gibt die Art des gespeicherten Models an, in diesem Fall ein Tensorflow SavedModel. Der erste Pfad zeigt auf das Verzeichnis, in welchem sich das zu konvertierende Model befindet. Dieses sollte sich, solange nicht beim Speichern im Notebook verändert, unter *loc4tor/PythonScripts/models/loc4tor/1* befinden.

Der zweite Pfad zeigt auf das Verzeichnis, in welchem das konvertierte Model gespeichert werden soll. Damit das JavaScript das konvertierte Model findet, muss dieses  zwingend in das oben angegebenen Verzeichnis konvertiert werden.



## <a name="contributing"></a> Contributing

1. Fork it (<https://github.com/LucaT16/loc4tor/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am *Add some fooBar*`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
