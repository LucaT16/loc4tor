# loc4tor

Dies ist das Github Repo des loc4tors.
 
## Contents

1. Repo-Inhalt
2. Installation
3. Development setup

## Repo-Inhalt

Das Repository teilt sich in die 3 Bereiche: Frontend, PythonScript und Bilder.

### Frontend

Der frontend-Ordner beinhaltet die Webanwendung des loc4tor. Neben den standartmäßigen Dateien für eine Website befindet sich hier auch das trainierte Tensorflow-CNN-Model als JSON-Datei.

### PythonScripts

PythonScripts beinhaltet zum einen das Jupyter-Notebook des loc4tor. In diesem Notebook wird das CNN-Model mithilfe von Tensorflow und Keras erstellt und trainiert. Darüber hinaus enthält der Ordner zwei weitere Python-Skripts *ScaleImages.py* und *CreateDataset.py*. 
Das Skript *ScaleIamges.py* loopt über die Ordner der Sehenswürdigkeiten, welche sich im Bilder-Ordner befinden. Das Skript rotiert diese Bilder zehn mal zufällig und speichert sie, um den Datensatz der Bilder zu erhöhen.
Das Skript *CreateDataset.py* generiert aus den im vorherigen Skript erstellten Bildern zwei binäre Pickle-Dateien, welche im loc4tor-Notebook als Tranings- bzw. Testdaten verwendet werden können. 

## Installation

Um die Website und die Funktionalität der KI zu testen muss der Frontend-Ordner auf dem localhost gehostet werden. Hierfür bietet sich bspw. [XAMPP](https://www.apachefriends.org/de/download.html) an. Hierfür muss lediglich der frontend-Ordner in das htdocs-Verzeichnis von XAMPP kopiert werden, dann ist die Website unter http://localhost:8080/frontend/ erreichbar und verwendbar. Eine Anleitung zum einrichten von XAMPP finden sie [hier](https://wiki.selfhtml.org/wiki/Webserver/lokal_einrichten).

## Development setup

Um selbst am Model zuarbeiten sind eine Reihe an Schritten notwendig.

### Voraussetzungen 

Für das Verwenden des Jupyter-Notebooks ist eine Anaconda-Umgebung mit bestimmten Modulen bzw. Paketen notwendig. 
Folgende Module/Pakete werden für die Verwendung des Juypter-Notebooks, sowie den Python Skripts benötigt:
* Python
* Tensorflow
* matplotlib
* scikit-learn
* numpy
* opencv
* pillow

#### 1. Bilder generieren

Da weder die Pickle-Dateien, noch die rotierten Bilder in diesem Repo hochgeladen werden (aus speicher-technischen Gründen), müssen zunächst die notwenigen Bilder für das Datenset generiert werden. Navigiere hierfür in das Verzeichnis loc4tor/PythonScripts und führe das Skript *ScaleImages.py* aus:

```
$ python ScaleImages.py

oder 

$ python3 ScaleImages.py
```

Das Skript loopt über die Verzeichnisse der Sehenswürdigkeiten im Ordner *Bilder* und erstellt jeweils ein weiteres Verzeichnis mit dem Namen der Sehenswürdigkeit gefolgt von einem "Cropped". Anschließend loopt das Skript über alle sich in den Verzeichnis befindlichen Bilder und rotiert diese zehn mal in einem zufälligen Winkel. Diese Bilder werden in den *Cropped* Verzeichnissen gespeichert. Auf diese Weise erhöht sich der Datensatz von etwa 100 Bildern pro Ort auf 1000+ Bilder pro Ort.

#### 2. Dataset generieren

Ist das Skript durchlaufen, kann nun das Skript *CreateDataset.py* ausgeführt werden: 

```
$ python CreateDataset.py

oder 

$ python3 CreateDataset.py
```

In *CreateDataset.py* wird über werden die im vorherigen Skript generierten Bilder (in Form eines Arrays der Pixel des Bildes) zusammen mit dem dazugehörigen Label (also um welche Sehenswürdigkeit es sich handelt) im Array *training_data[]* gespeichert. Dieses wird anschließend durchmischt, so dass die Bilder der Sehenswürdigkeiten in zufälliger Reihenfolge im Array vorhanden sind. Dies bewirkt, dass das Model später beim Trainieren nicht zuerst eine Sehenswürdigkeit trainiert, dann die nächste usw. 
Anschließend wird über *training_data* geloopt, um die Bilder und die dazugehörigen Label in verschiedene Arrays zu speichern. Aus diesen Array werden dann die Dateien *x.pickle* und *y.pickle* generiert. *x.pickle* beinhaltet alle Bilder der Datensets und *x.pickle* die Label der Bilder in gleicher Reihenfolge. 

#### 3. Model trainieren & testen

Ist das Datenset in Form der Pickle-Dateien erstellt, kann das Model trainiert und getestet werden. Hierfür muss das Notebook *loc4tor.ipynb* in Jupyter-Notebook geöffnet werden. Das Notebook beinhaltet alle notwendigen Schritte, um das Model zu erstellen, trainieren und testen zu können. Anpassungen können in den einzelnen Schritten individuell vorgenommen werden. 

#### 4. 


```sh
make install
npm test
```

## Release History

* 0.2.1
    * CHANGE: Update docs (module code remains unchanged)
* 0.2.0
    * CHANGE: Remove `setDefaultXYZ()`
    * ADD: Add `init()`
* 0.1.1
    * FIX: Crash when calling `baz()` (Thanks @GenerousContributorName!)
* 0.1.0
    * The first proper release
    * CHANGE: Rename `foo()` to `bar()`
* 0.0.1
    * Work in progress

## Meta

Your Name – [@YourTwitter](https://twitter.com/dbader_org) – YourEmail@example.com

Distributed under the XYZ license. See ``LICENSE`` for more information.

[https://github.com/yourname/github-link](https://github.com/dbader/)

## Contributing

1. Fork it (<https://github.com/yourname/yourproject/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am *Add some fooBar*`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

<!-- Markdown link & img dfn*s -->
[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[wiki]: https://github.com/yourname/yourproject/wiki
