-- Criar função para salvar roteiro e atualizar contador
CREATE OR REPLACE FUNCTION save_itinerary(
  p_user_id UUID,
  p_destination TEXT,
  p_departure_date DATE,
  p_return_date DATE,
  p_interests TEXT,
  p_itinerary_data JSONB
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER -- Executa com as permissões do criador da função
AS $$
DECLARE
  v_itinerary_id UUID;
  v_current_count INTEGER;
BEGIN
  -- Inserir o roteiro
  INSERT INTO itineraries(
    user_id,
    destination,
    departure_date,
    return_date,
    interests,
    itinerary_data
  ) VALUES (
    p_user_id,
    p_destination,
    p_departure_date,
    p_return_date,
    p_interests,
    p_itinerary_data
  ) RETURNING id INTO v_itinerary_id;
  
  -- Obter o contador atual
  SELECT count_itineraries INTO v_current_count
  FROM profiles
  WHERE id = p_user_id;
  
  -- Atualizar o contador
  UPDATE profiles
  SET count_itineraries = COALESCE(v_current_count, 0) + 1
  WHERE id = p_user_id;
  
  -- Retornar o ID do roteiro criado
  RETURN jsonb_build_object(
    'id', v_itinerary_id,
    'success', true
  );
EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', SQLERRM
    );
END;
$$;

-- Conceder permissão para usuários autenticados chamarem a função
GRANT EXECUTE ON FUNCTION save_itinerary TO authenticated;

-- Comentário explicativo
COMMENT ON FUNCTION save_itinerary IS 'Salva um roteiro e atualiza o contador de roteiros do usuário'; 