# -*- coding: utf-8 -*-
import tensorflow as tf
from keras.layers import Input, Dense, Conv2D, MaxPooling2D, AveragePooling2D, ZeroPadding2D, Dropout, Flatten, Concatenate, Reshape, Activation
from keras.models import Model


def VGG10(num_class, input_shape=(32, 32, 3), output_channel=512):
    output_channel = [int(output_channel / 8), int(output_channel / 4),
                      int(output_channel / 2), output_channel]  # [64, 128, 256, 521]
    inputs = tf.keras.layers.Input(input_shape)  # 32x32x3
    outputs = tf.keras.layers.Conv2D(output_channel[0], 3, padding='same', activation='relu')(inputs)  # 32x32x64
    outputs = tf.keras.layers.MaxPooling2D(2, 2)(outputs)  # 16x16x64
    outputs = tf.keras.layers.Conv2D(output_channel[1], 3, padding='same', activation='relu')(outputs)  # 16x16x128
    outputs = tf.keras.layers.MaxPooling2D(2, 2)(outputs)  # 8x8x128
    outputs = tf.keras.layers.Conv2D(output_channel[2], 3, padding='same', activation='relu')(outputs)  # 8x8x256
    outputs = tf.keras.layers.Conv2D(output_channel[2], 3, padding='same', activation='relu')(outputs)  # 8x8x256
    outputs = tf.keras.layers.MaxPooling2D(2, 2)(outputs)  # 4x4x256
    outputs = tf.keras.layers.Conv2D(output_channel[3], 3, padding='same', activation='relu', use_bias=False)(
        outputs)  # 4x4x512
    outputs = tf.keras.layers.BatchNormalization()(outputs)
    outputs = tf.keras.layers.ReLU()(outputs)
    outputs = tf.keras.layers.Conv2D(output_channel[3], 3, padding='same', activation='relu', use_bias=False)(
        outputs)  # 4x4x512
    outputs = tf.keras.layers.BatchNormalization()(outputs)
    outputs = tf.keras.layers.ReLU()(outputs)
    outputs = tf.keras.layers.MaxPooling2D(2, 2)(outputs)  # 2x2x512
    outputs = tf.keras.layers.Flatten()(outputs)  # 2048
    outputs = tf.keras.layers.Dropout(0.3)(outputs)
    outputs = tf.keras.layers.Dense(num_class, activation='softmax')(outputs)

    model = tf.keras.models.Model(inputs=inputs, outputs=outputs)

    return model

def VGG16(num_class, input_shape=(32,32,3), output_channel=512):
    output_channel = [int(output_channel / 8), int(output_channel / 4),
                      int(output_channel / 2), output_channel] # [64, 128, 256, 521]
    inputs = tf.keras.layers.Input(input_shape) # 64x64x3
    outputs = tf.keras.layers.Conv2D(output_channel[0], 3, strides=1, padding='same')(inputs) # 64x64x64
    outputs = tf.keras.layers.BatchNormalization()(outputs)
    outputs = tf.keras.layers.ReLU()(outputs)
    outputs = tf.keras.layers.Conv2D(output_channel[0], 3, strides=1, padding='same')(outputs)  # 64x64x64
    outputs = tf.keras.layers.BatchNormalization()(outputs)
    outputs = tf.keras.layers.ReLU()(outputs)
    outputs = tf.keras.layers.MaxPooling2D(pool_size=(2, 2), strides=2)(outputs) # 32x32x64

    outputs = tf.keras.layers.Conv2D(output_channel[1], 3, strides=1, padding='same')(outputs) # 16x16x128
    outputs = tf.keras.layers.BatchNormalization()(outputs)
    outputs = tf.keras.layers.ReLU()(outputs)
    outputs = tf.keras.layers.Conv2D(output_channel[1], 3, strides=1, padding='same')(outputs)  # 16x16x128
    outputs = tf.keras.layers.BatchNormalization()(outputs)
    outputs = tf.keras.layers.ReLU()(outputs)
    outputs = tf.keras.layers.MaxPooling2D(pool_size=(2, 2), strides=2)(outputs) # 8x8x128

    outputs = tf.keras.layers.Conv2D(output_channel[2], 3, strides=1, padding='same')(outputs)  # 8x8x256
    outputs = tf.keras.layers.BatchNormalization()(outputs)
    outputs = tf.keras.layers.ReLU()(outputs)
    outputs = tf.keras.layers.Conv2D(output_channel[2], 3, strides=1, padding='same')(outputs)  # 8x8x256
    outputs = tf.keras.layers.BatchNormalization()(outputs)
    outputs = tf.keras.layers.ReLU()(outputs)
    outputs = tf.keras.layers.Conv2D(output_channel[2], 3, strides=1, padding='same')(outputs)  # 8x8x256
    outputs = tf.keras.layers.BatchNormalization()(outputs)
    outputs = tf.keras.layers.ReLU()(outputs)
    outputs = tf.keras.layers.MaxPooling2D(pool_size=(2, 2), strides=2)(outputs) # 4x4x256

    outputs = tf.keras.layers.Conv2D(output_channel[3], 3, strides=1, padding='same')(outputs) # 4x4x512
    outputs = tf.keras.layers.BatchNormalization()(outputs)
    outputs = tf.keras.layers.ReLU()(outputs)
    outputs = tf.keras.layers.Conv2D(output_channel[3], 3, strides=1, padding='same')(outputs)  # 4x4x512
    outputs = tf.keras.layers.BatchNormalization()(outputs)
    outputs = tf.keras.layers.ReLU()(outputs)
    outputs = tf.keras.layers.Conv2D(output_channel[3], 3, strides=1, padding='same')(outputs)  # 4x4x512
    outputs = tf.keras.layers.BatchNormalization()(outputs)
    outputs = tf.keras.layers.ReLU()(outputs)
    outputs = tf.keras.layers.MaxPooling2D(pool_size=(2, 2), strides=2)(outputs) # 2x2x512

    outputs = tf.keras.layers.Conv2D(output_channel[3], 3, strides=1, padding='same')(outputs) # 4x4x512
    outputs = tf.keras.layers.BatchNormalization()(outputs)
    outputs = tf.keras.layers.ReLU()(outputs)
    outputs = tf.keras.layers.Conv2D(output_channel[3], 3, strides=1, padding='same')(outputs)  # 4x4x512
    outputs = tf.keras.layers.BatchNormalization()(outputs)
    outputs = tf.keras.layers.ReLU()(outputs)
    outputs = tf.keras.layers.Conv2D(output_channel[3], 3, strides=1, padding='same')(outputs)  # 4x4x512
    outputs = tf.keras.layers.BatchNormalization()(outputs)
    outputs = tf.keras.layers.ReLU()(outputs)
    outputs = tf.keras.layers.MaxPooling2D(pool_size=(2, 2), strides=2)(outputs) # 2x2x512

    outputs = tf.keras.layers.Flatten()(outputs) # 2048
    outputs = tf.keras.layers.Dense(4096, activation='relu')(outputs)
    outputs = tf.keras.layers.Dropout(0.5)(outputs)
    outputs = tf.keras.layers.Dense(4096, activation='relu')(outputs)
    outputs = tf.keras.layers.Dropout(0.5)(outputs)
    outputs = tf.keras.layers.Dense(4096, activation='relu')(outputs)
    outputs = tf.keras.layers.Dropout(0.5)(outputs)
    outputs = tf.keras.layers.Dense(num_class, activation='softmax')(outputs)
    
    model = tf.keras.models.Model(inputs=inputs, outputs=outputs)
    
    return model

def ResNet152(num_class, input_shape=(32,32,3), output_channel=512):
    inputs = tf.keras.layers.Input(input_shape)
    outputs = tf.keras.layers.Conv2D(64, kernel_size=7, strides=2, padding='same')(inputs)
    outputs = tf.keras.layers.BatchNormalization()(outputs)
    outputs = tf.keras.layers.Activation('relu')(outputs)
    outputs = tf.keras.layers.MaxPool2D(pool_size=3, strides=2, padding='same')(outputs)
    outputs = ResnetBlock(64, 3, first_block=True)(outputs)
    outputs = ResnetBlock(128, 8)(outputs)
    outputs = ResnetBlock(256, 36)(outputs)
    outputs = ResnetBlock(512, 3)(outputs)
    outputs = tf.keras.layers.GlobalAvgPool2D()(outputs)
    outputs = tf.keras.layers.Dense(num_class, activation='softmax')(outputs)

    model = tf.keras.models.Model(inputs=inputs, outputs=outputs)

    return model

# def ResNet50(num_class, input_shape=(32,32,3), output_channel=512):
#     inputs = tf.keras.layers.Input(input_shape)
#     outputs = tf.keras.layers.Conv2D(64, kernel_size=7, strides=2, padding='same')(inputs)
#     outputs = tf.keras.layers.BatchNormalization()(outputs)
#     outputs = tf.keras.layers.Activation('relu')(outputs)
#     outputs = tf.keras.layers.MaxPool2D(pool_size=3, strides=2, padding='same')(outputs)
#     outputs = ResnetBlock(64, 2, first_block=True)(outputs)
#     outputs = ResnetBlock(128, 2)(outputs)
#     outputs = ResnetBlock(256, 2)(outputs)
#     outputs = ResnetBlock(512, 2)(outputs)
#     outputs = tf.keras.layers.GlobalAvgPool2D()(outputs)
#     outputs = tf.keras.layers.Dense(num_class, activation='softmax')(outputs)

#     model = tf.keras.models.Model(inputs=inputs, outputs=outputs)

#     return model

class Residual(tf.keras.Model):  #@save
    """The Residual block of ResNet."""
    def __init__(self, num_channels, use_1x1conv=False, strides=1):
        super().__init__()
        self.conv1 = tf.keras.layers.Conv2D(
            num_channels, padding='same', kernel_size=1, strides=strides)
        self.conv2 = tf.keras.layers.Conv2D(
            num_channels, kernel_size=3, padding='same')
        self.conv3 = None
        if use_1x1conv:
            self.conv3 = tf.keras.layers.Conv2D(
                num_channels, kernel_size=1, strides=strides)
        self.bn1 = tf.keras.layers.BatchNormalization()
        self.bn2 = tf.keras.layers.BatchNormalization()

    def call(self, X):
        Y = tf.keras.activations.relu(self.bn1(self.conv1(X)))
        Y = self.bn2(self.conv2(Y))
        if self.conv3 is not None:
            X = self.conv3(X)
        Y += X
        return tf.keras.activations.relu(Y)

class ResnetBlock(tf.keras.layers.Layer):
    def __init__(self, num_channels, num_residuals, first_block=False,
                 **kwargs):
        super(ResnetBlock, self).__init__(**kwargs)
        self.residual_layers = []
        for i in range(num_residuals):
            if i == 0 and not first_block:
                self.residual_layers.append(
                    Residual(num_channels, use_1x1conv=True, strides=2))
            else:
                self.residual_layers.append(Residual(num_channels))

    def call(self, X):
        for layer in self.residual_layers.layers:
            X = layer(X)
        return X


from keras.layers import Conv2D, MaxPooling2D, GlobalAveragePooling2D, Activation, Dense, BatchNormalization
from keras.layers import Add, Reshape, Multiply
import keras.backend as K

def conv2d_bn(x, filters, kernel_size, padding='same', strides=1, activation='relu'):
    x = Conv2D(filters, kernel_size, kernel_initializer='he_normal', padding=padding, strides=strides)(x)
    x = BatchNormalization()(x)
    if activation:
        x = Activation(activation)(x)
    
    return x


def SE_block(input_tensor, reduction_ratio=16):
    ch_input = K.int_shape(input_tensor)[-1]
    ch_reduced = ch_input//reduction_ratio
    
    # Squeeze
    x = GlobalAveragePooling2D()(input_tensor) # Eqn.2
    
    # Excitation
    x = Dense(ch_reduced, kernel_initializer='he_normal', activation='relu', use_bias=False)(x) # Eqn.3
    x = Dense(ch_input, kernel_initializer='he_normal', activation='sigmoid', use_bias=False)(x) # Eqn.3
    
    x = Reshape( (1, 1, ch_input) )(x)
    x = Multiply()([input_tensor, x]) # Eqn.4
    
    return x
   

def SE_residual_block(input_tensor, filter_sizes, strides=1, reduction_ratio=16):
    filter_1, filter_2, filter_3 = filter_sizes
    
    x = conv2d_bn(input_tensor, filter_1, (1, 1), strides=strides)
    x = conv2d_bn(x, filter_2, (3, 3))
    x = conv2d_bn(x, filter_3, (1, 1), activation=None)
    
    x = SE_block(x, reduction_ratio)
    
    projected_input = conv2d_bn(input_tensor, filter_3, (1, 1), strides=strides, activation=None) if K.int_shape(input_tensor)[-1] != filter_3 else input_tensor
    shortcut = Add()([projected_input, x])
    shortcut = Activation(activation='relu')(shortcut)
    
    return shortcut
 

def stage_block(input_tensor, filter_sizes, blocks, reduction_ratio=16, stage=''):
    strides = 2 if stage != '2' else 1
    
    x = SE_residual_block(input_tensor, filter_sizes, strides, reduction_ratio) # projection layer

    for i in range(blocks-1):
        x = SE_residual_block(x, filter_sizes, reduction_ratio=reduction_ratio)
    
    return x
    

def SE_ResNet50(num_class, input_shape=(32, 32, 3)):
    model_input = tf.keras.layers.Input(input_shape)  # 64x64x3
    stage_1 = conv2d_bn(model_input, 64, (7, 7), strides=2, padding='same') # (112, 112, 64)
    stage_1 = MaxPooling2D((3, 3), strides=2, padding='same')(stage_1) # (56, 56, 64)
    
    stage_2 = stage_block(stage_1, [64, 64, 256], 3, reduction_ratio=16, stage='2')
    stage_3 = stage_block(stage_2, [128, 128, 512], 4, reduction_ratio=16, stage='3') # (28, 28, 512)
    stage_4 = stage_block(stage_3, [256, 256, 1024], 6, reduction_ratio=16, stage='4') # (14, 14, 1024)
    stage_5 = stage_block(stage_4, [512, 512, 2048], 3, reduction_ratio=16, stage='5') # (7, 7, 2048)

    gap = GlobalAveragePooling2D()(stage_5)
    
    model_output = Dense(num_class, activation='softmax', kernel_initializer='he_normal')(gap) # 'softmax'
    
    model = Model(inputs=model_input, outputs=model_output, name='SE-ResNet50')
        
    return model