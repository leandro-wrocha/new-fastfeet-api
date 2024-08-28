# Retorno de DTO:
  - Formato de Retorno: Ao retornar um deliverer do caso de uso, pode ser interessante mapear a entidade para um DTO (Data Transfer Object) antes de retorná-lo. Isso desacopla a entidade de domínio do que é retornado para camadas superiores, como controladores, melhorando a flexibilidade para mudanças futuras.

  ```
    return right({ deliverer: DelivererDTO.fromEntity(deliverer) });

    // class DTO
    class DelivererDTO {
      static fromEntity(entity: Deliverer) {
        return {
          id: entity.id.toString(),
          name: entity.name,
          cpf: entity.cpf,
          // outros campos necessários
        };
      }
    }
  ```