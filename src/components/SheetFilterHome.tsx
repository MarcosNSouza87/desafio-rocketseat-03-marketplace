import React, { useState } from 'react';
import * as GS from '@gluestack-ui/themed';
import { Check, X } from 'lucide-react-native';
import { Button } from './Button';

type Props = {
  filter: any;
  showActionsheet: boolean;
  setShowActionsheet: (active: boolean) => void;
  setFilter: (filters: any) => void; // Função para aplicar os filtros
  handleResetFilters: () => void;
};

export function SheetFilterHome({
  setShowActionsheet,
  showActionsheet,
  setFilter,
  handleResetFilters
}: Props) {
  // Inicializando o estado dos filtros
  const [filters, setFilters] = useState({
    is_new: true, // 'novo' ou 'usado'
    accept_trade: false,
    payment_methods: [] as string[],
  });

  // Função para alternar a condição (novo/usado)
  const handleSwitchCondition = (value: any) => {
		console.log(value)
    setFilters((prevState) => ({
      ...prevState,
      is_new: value,
    }));
  };

  // Função para alternar a aceitação de troca
  const handleSwitchTrade = (value: any) => {
    setFilters((prevState) => ({
      ...prevState,
      accept_trade: value,
    }));
  };

  // Função para atualizar os métodos de pagamento
  const handlePaymentMethodChange = (keys: string[]) => {
    setFilters((prevState) => ({
      ...prevState,
      payment_methods: keys,
    }));
  };

  // Função para aplicar os filtros
  const handleApplyFilters = () => {
		// console.log(filters)
    setFilter(filters); // Passa os filtros para o componente pai
    setShowActionsheet(false); // Fecha a action sheet
  };


  return (
    <GS.Actionsheet
      style={{ backgroundColor: '#00000088' }}
      isOpen={showActionsheet}
      onClose={() => setShowActionsheet(false)}
    >
      <GS.ActionsheetContent bg="$gray600">
        <GS.ActionsheetDragIndicatorWrapper>
          <GS.ActionsheetDragIndicator />
        </GS.ActionsheetDragIndicatorWrapper>
        <GS.ActionsheetItem bg="$gray600">
          <GS.VStack w="$full">
            <GS.HStack alignItems="center" pb="$7">
              <GS.Heading flex={1}>Filtrar anúncios</GS.Heading>
              <GS.Pressable onPress={() => setShowActionsheet(false)}>
                <GS.Icon as={X} />
              </GS.Pressable>
            </GS.HStack>

            <GS.VStack marginVertical="$4">
              <GS.Heading fontSize="$sm">Condição</GS.Heading>
              <GS.Switch
                size="sm"
                trackColor={{ false: '$gray700', true: '$blue500' }}
                thumbColor={'$gray700'}
                ios_backgroundColor={'$gray600'}
                value={filters.is_new} // Verifica se é 'novo'
                onValueChange={(value) => handleSwitchCondition(value)}
              />
              <GS.Text size="sm">{filters.is_new ? 'Novo' : 'Usado'}</GS.Text>
            </GS.VStack>

            <GS.VStack marginVertical="$4">
              <GS.Heading fontSize="$sm">Aceita troca?</GS.Heading>
              <GS.Switch
                size="sm"
                trackColor={{ false: '$gray700', true: '$blue500' }}
                thumbColor={'$gray700'}
                ios_backgroundColor={'$gray600'}
                value={filters.accept_trade}
                onValueChange={(value) => handleSwitchTrade(value)}
              />
              <GS.Text size="sm">{filters.accept_trade ? 'Sim' : 'Não'}</GS.Text>
            </GS.VStack>

            <GS.Heading mt="$2" mb="$3" fontSize="$sm">
              Meios de pagamento aceitos
            </GS.Heading>

            <GS.CheckboxGroup
              value={filters.payment_methods}
              onChange={handlePaymentMethodChange}
            >
              <GS.VStack space="md" mb="$16">
                <GS.Checkbox value="boleto" alignItems="center">
                  <GS.CheckboxIndicator>
                    <GS.CheckboxIcon as={Check} color="$gray600" />
                  </GS.CheckboxIndicator>
                  <GS.CheckboxLabel ml="$2" color="$gray200">
                    Boleto
                  </GS.CheckboxLabel>
                </GS.Checkbox>
                <GS.Checkbox value="pix" alignItems="center">
                  <GS.CheckboxIndicator>
                    <GS.CheckboxIcon as={Check} color="$gray600" />
                  </GS.CheckboxIndicator>
                  <GS.CheckboxLabel ml="$2" color="$gray200">
                    Pix
                  </GS.CheckboxLabel>
                </GS.Checkbox>
                <GS.Checkbox value="dinheiro" alignItems="center">
                  <GS.CheckboxIndicator>
                    <GS.CheckboxIcon as={Check} color="$gray600" />
                  </GS.CheckboxIndicator>
                  <GS.CheckboxLabel ml="$2" color="$gray200">
                    Dinheiro
                  </GS.CheckboxLabel>
                </GS.Checkbox>
                <GS.Checkbox value="creditcard" alignItems="center">
                  <GS.CheckboxIndicator>
                    <GS.CheckboxIcon as={Check} color="$gray600" />
                  </GS.CheckboxIndicator>
                  <GS.CheckboxLabel ml="$2" color="$gray200">
                    Cartão de Crédito
                  </GS.CheckboxLabel>
                </GS.Checkbox>
                <GS.Checkbox value="deposit" alignItems="center">
                  <GS.CheckboxIndicator>
                    <GS.CheckboxIcon as={Check} color="$gray600" />
                  </GS.CheckboxIndicator>
                  <GS.CheckboxLabel ml="$2" color="$gray200">
                    Depósito Bancário
                  </GS.CheckboxLabel>
                </GS.Checkbox>
              </GS.VStack>
            </GS.CheckboxGroup>

            <GS.VStack mb="$10">
              <Button title="Aplicar filtros" mb="$3" onPress={handleApplyFilters} />
              <Button type="outline" title="Resetar filtros" onPress={handleResetFilters} />
            </GS.VStack>
          </GS.VStack>
        </GS.ActionsheetItem>
      </GS.ActionsheetContent>
    </GS.Actionsheet>
  );
}
