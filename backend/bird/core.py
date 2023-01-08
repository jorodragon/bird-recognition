import os

import librosa
import librosa.display
import matplotlib
import matplotlib.pyplot as plt
import numpy as np
from tensorflow.keras.utils import img_to_array
from matplotlib.pyplot import gcf
from tensorflow.keras.layers import Dense, Dropout, Flatten
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
import efficientnet.tfkeras as efn
import tempfile
import shutil
from tensorflow.keras.preprocessing.image import load_img
import noisereduce as no
# from efficientnet.keras import preprocess_input
from tensorflow.keras.applications.xception import Xception, preprocess_input

matplotlib.use('Agg')

THIS_DIR = os.path.dirname(os.path.realpath(__file__))
FILE_UPLOAD_DIR = os.path.join(THIS_DIR, 'uploads')
classes = np.array([
    "0se",
    "1hoang-yen",
    "2hoa-mi",
    "3tri",
    "4trich-co",
    "5hoet-lua",
    "6le-le",
    "7sao-nau",
    "8cu-dat",
    "9chich-choe",
    "10cong-coc",
    "11ca-cuong",
    "12co",
    "13quoc",
    "14hec-xoan",
    "15hoet-den",
    "16phuong-hoang-dat",
    "17oanh",
    "18huyt-co",
    "19khuou",
    "20trich-re",
    "21chang-nghich",
    "22mo-nhat",
    "23de-giun",
    "24khuyen",
    "25bim-bip",
    "26chao-mao",
    "27hut-mat",
    "28cheo-beo",
    "29cut",
    "30sau",
    "31cum-num",
    "32thanh-lam",
    "33bo-cau",
    "34choc-quach",
    "35que-lam",
    "36ngu-sac",
    "37hoanh-hoach",
    "38en",
    "39thanh-tuoc",
    "40vac",
    "41chia-voi",
    "42mat-xeo",
    "43mat-do",
    "44sam-cam",
    "45cu-gay",
    "46ket",
    "47trao-trao",
    "48xanh-tim",
])


def fig2img(fig):
    fig.savefig("test.jpg")
    image = load_img("test.jpg", target_size=(224, 224))
    return image


def handle_uploaded_file(source):
    print(source.name)
    fd, filepath = tempfile.mkstemp(
        suffix=source.name, dir=FILE_UPLOAD_DIR)
    with open(filepath, 'wb') as dest:
        shutil.copyfileobj(source, dest)
    print(source.name, filepath)
    return filepath


def create_spectrogram(file):
    """ loads audio file and creates spectrogram """
    filepath = handle_uploaded_file(file)
    # signal, sr = sf.read(filepath)
    signal, sr = librosa.load(filepath, duration=5)
    signal = no.reduce_noise(y=signal, sr=sr)
    fig = gcf()
    DPI = fig.get_dpi()
    fig = plt.figure()
    # fig.set_size_inches(6,6)
    fig.set_size_inches(224 / float(DPI), 224 / float(DPI))

    ax = plt.Axes(fig, [0., 0., 1., 1.])
    ax.set_axis_off()
    fig.add_axes(ax)

    S = librosa.feature.melspectrogram(y=signal, sr=sr,
                                       n_fft=1024,
                                       hop_length=1024,
                                       n_mels=128,
                                       htk=True,
                                       fmin=1400,
                                       fmax=sr / 2)
    librosa.display.specshow(librosa.power_to_db(
        S ** 2, ref=np.max), fmin=1400, y_axis='linear')

    image = fig2img(fig)
    image = img_to_array(image)
    image = np.array([image])
    image = preprocess_input(image)
    return image, fig


def predict(model, image):
    """ makes prediction out of the spectrogram """
    # net = efn.EfficientNetB3(
    #     include_top=False, weights="imagenet", input_tensor=None, input_shape=(224, 224, 3)
    # )
    net = Xception(include_top=False,
                   weights='imagenet',
                   input_tensor=None,
                   input_shape=(224, 224, 3))
    x = net.output
    x = Flatten()(x)
    x = Dropout(0.5)(x)
    output_layer = Dense(49, activation='softmax', name='softmax')(x)
    loaded_model = Model(inputs=net.input, outputs=output_layer)
    loaded_model.load_weights(model)
    loaded_model.compile(optimizer=Adam(learning_rate=5e-5),
                         loss='categorical_crossentropy', metrics=['accuracy'])
    pred = loaded_model.predict(image)
    return pred


def create_result(pred):
    """ creates results (bird class and probability) """
    top = np.argsort(pred[0])[:-2:-1]
    result = {'bird': classes[top[0]], 'probability': int(
        round(pred[0][top[0]], 2) * 100)}
    return result
