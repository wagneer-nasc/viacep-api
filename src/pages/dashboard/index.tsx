import React, { useState } from 'react';
import api from '../../service/api';
import {
    Container, Title, TextInput,
    ContainerTextInput, ContainerButton, ButtonText,
    TitleCepData, CepItems, TextItems
} from './styles';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import Toast from 'react-native-tiny-toast'


export interface Cep {
    cep: string,
    logradouro: string,
    bairro: string,
    localidade: string,
    uf: string,
}

const Dashboard: React.FC = () => {
    const [newCep, setNewCep] = useState('');
    const [cep, setCep] = useState<Cep>();
     
    async function handleCep(): Promise<void> {
        if (!newCep) {
            return Toast.show('Preencha o form para consultar o cep.')
        }
        try {
            await api.get<Cep>(`${newCep}/json`).then(response => {
                setCep(response.data)
                Toast.showSuccess('sucesso')
            })

        } catch (err) {
            return Toast.show('Endereço não encontrado, consulta o cep.')
        }

    }

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flex: 1 }}
                >
                    <Container>
                        <View>
                            <Title>Consulte endereço ViaCep</Title>
                        </View>
                        <ContainerTextInput>
                            <TextInput
                                value={newCep}
                                onChangeText={setNewCep}
                                placeholder="Digite seu cep aqui..."
                                keyboardType="numbers-and-punctuation"
                                returnKeyType="send"
                                onSubmitEditing={handleCep}
                                keyboardAppearance="dark"
                            >
                            </TextInput>
                        </ContainerTextInput>

                        <ContainerButton onPress={handleCep}>
                            <ButtonText>Consultar</ButtonText>
                        </ContainerButton>

                        <View>
                            <TitleCepData>Resultado da Consulta</TitleCepData>
                            <CepItems>
                                <TextItems>CEP: {cep?.cep}</TextItems>
                                <TextItems>Rua: {cep?.logradouro}</TextItems>
                                <TextItems>Bairro: {cep?.bairro}</TextItems>
                                <TextItems>Cidade: {cep?.localidade}</TextItems>
                                <TextItems>UF: {cep?.uf}</TextItems>
                            </CepItems>
                        </View>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

        </>

    )
}

export default Dashboard;