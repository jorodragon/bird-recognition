## Data preprocessing
The data should be prepared. Each song is cut into 5 second recordings and preprocessed into melspectrograms. The purpose is to normalize dataset to have same size along the whole dataset in one run, and to denoise recordings. Morover, the data is filtered with a high-pass filter. Data can be preprocessed using prepareData.ipynb

## Dataset split
splitDataset.ipynb divides our dataset into train, validation and test set in ratio 8:1:1. We can't use preprogrammed functions to do that, because we have divided each of our files into other smallers (i.e. one sound to six images). Putting images made out of same mp3 file might lead to the data leakage and make our results not trustworthy and biased.

## Training 
We approached the problem of song classification with Convolutional Neural Networks. We have tested it with:
* Xception 
* MobileNets
* EfficientNets
