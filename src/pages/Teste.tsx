import { Component } from "@/components/component";
import { Frame } from "@/components/frame";
import { Group } from "@/components/group";
import { PropertyPrimRioWrapper } from "@/components/property";
import { useState } from "react";
import "./style.css";

const Teste = () => {
  const [destination, setDestination] = useState("");

  return (
    <div className="homepage-travelfy">
      <div className="div-2">
        <div className="overlap">
          <div className="rectangle-2" />

          <p className="text-wrapper-15">
            Copyright © - Travelfy - Todos os direitos reservados. 2023
          </p>

          <div className="frame-13">
            <div className="frame-wrapper">
              <div className="frame-14">
                <div className="text-wrapper-16">INSTITUCIONAL</div>

                <div className="frame-15">
                  <div className="text-wrapper-17">Sobre</div>

                  <div className="text-wrapper-18">Carreiras</div>

                  <div className="text-wrapper-18">Logistica</div>

                  <div className="text-wrapper-18">Privacidade</div>
                </div>
              </div>
            </div>

            <div className="frame-wrapper">
              <div className="frame-14">
                <div className="text-wrapper-16">CONTATO</div>

                <div className="frame-15">
                  <div className="text-wrapper-17">Ajuda - FAQ</div>

                  <div className="text-wrapper-18">Imprensa</div>

                  <div className="text-wrapper-18">Afiliados</div>
                </div>
              </div>
            </div>

            <div className="frame-wrapper">
              <div className="frame-14">
                <div className="text-wrapper-16">AJUDA</div>

                <div className="frame-16">
                  <div className="text-wrapper-17">Help Center</div>

                  <div className="text-wrapper-18">Midias</div>

                  <div className="text-wrapper-18">Chat ao vivo</div>
                </div>
              </div>
            </div>
          </div>

          <div className="frame-17">
            <div className="rectangle-3" />

            <div className="frame-18">
              <div className="frame-19">
                <p className="assine-nossa">
                  Assine nossa Newsletter e<br />
                  Receba promoções incríveis!
                </p>

                <p className="text-wrapper-19">
                  Lorem ipsum dolor sit amet consectetur. Aliquet malesuada
                  tellus viverra ultricies egestas sociis gravida sem. Enim elit
                  massa ullamcorper erat.
                </p>
              </div>

              <div className="frame-20">
                <div className="rectangle-4" />

                <div className="frame-21">
                  <div className="text-wrapper-20">
                    DIGITE SEU MELHOR E-MAIL
                  </div>

                  <div className="frame-22">
                    <img
                      className="outgoing-mail"
                      alt="Outgoing mail"
                      src="https://c.animaapp.com/iA1lbPU9/img/outgoing-mail-fill0-wght400-grad0-opsz48-1.svg"
                    />

                    <div className="text-wrapper-21">ASSINAR</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="frame-23">
            <img
              className="TRAVELFY"
              alt="Travelfy"
              src="https://c.animaapp.com/iA1lbPU9/img/travelfy-1.svg"
            />

            <p className="text-wrapper-22">
              Lorem ipsum dolor sit amet consectetur. Aliquet malesuada tellus
              viverra ultricies egestas sociis gravida sem. Enim elit massa
              ullamcorper erat.
            </p>

            <div className="frame-24">
              <img
                className="img-2"
                alt="Facebook"
                src="https://c.animaapp.com/iA1lbPU9/img/facebook@2x.png"
              />

              <img
                className="img-2"
                alt="Tik tok"
                src="https://c.animaapp.com/iA1lbPU9/img/tiktok@2x.png"
              />

              <img
                className="img-2"
                alt="Twitter circled"
                src="https://c.animaapp.com/iA1lbPU9/img/twitter-circled@2x.png"
              />
            </div>
          </div>

          <img
            className="line"
            alt="Line"
            src="https://c.animaapp.com/iA1lbPU9/img/line-2.svg"
          />

          <img
            className="telegram"
            alt="Telegram"
            src="https://c.animaapp.com/iA1lbPU9/img/telegram-1@2x.png"
          />
        </div>

        <div className="overlap-group">
          <div className="overlap-2">
            <div className="overlap-3">
              <div className="BACKGROUND">
                <div className="rectangle-wrapper">
                  <div className="rectangle-5" />
                </div>
              </div>

              <div className="ellipse" />

              <div className="ellipse" />

              <div className="ellipse-2" />

              <div className="text-wrapper-23">LOGIN</div>

              <img
                className="TRAVELFY-2"
                alt="Travelfy"
                src="https://c.animaapp.com/iA1lbPU9/img/travelfy.svg"
              />

              <div className="navbar">
                <div className="text-wrapper-24">INICIO</div>

                <div className="text-wrapper-25">DESTINOS</div>

                <div className="text-wrapper-25">PACOTES</div>

                <div className="text-wrapper-25">CLIENTES</div>

                <div className="text-wrapper-25">CONTATO</div>
              </div>

              <div className="text-wrapper-26">LOGIN</div>

              <div className="TEXTO-HERO">
                <div className="frame-25">
                  <img
                    className="descubra-o-mundo-com"
                    alt="Descubra o mundo com"
                    src="https://c.animaapp.com/iA1lbPU9/img/descubra-o-mundo-com-a-travelfy-.png"
                  />

                  <p className="text-wrapper-27">
                    Lorem ipsum dolor sit amet consectetur. Nulla consectetur
                    dignissim lacus arcu tincidunt nisl dolor maecenas. Id
                    aenean non dignissim donec. Ut scelerisque dui arcu leo in
                    neque nullam.
                  </p>

                  <div className="frame-26">
                    <img
                      className="travel-explore"
                      alt="Travel explore"
                      src="https://c.animaapp.com/iA1lbPU9/img/travel-explore-fill0-wght400-grad0-opsz48-1.svg"
                    />

                    <div className="text-wrapper-28">EXPLORAR DESTINOS</div>
                  </div>
                </div>
              </div>

              <div className="CONFIGURACAO-DE">
                <div className="frame-27">
                  <div className="frame-28">
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="Para onde você quer ir?"
                      className="w-full px-4 py-2 text-base font-medium text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primriarosa focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="frame-30">
                  <img
                    className="img-3"
                    alt="Search"
                    src="https://c.animaapp.com/iA1lbPU9/img/search-fill0-wght400-grad0-opsz48-1.svg"
                  />
                  <div className="text-wrapper-31">Teste Agora</div>
                </div>
              </div>

              <div className="IMAGEM-HEADER">
                <div className="overlap-4">
                  <img
                    className="rectangle-6"
                    alt="Rectangle"
                    src="https://c.animaapp.com/iA1lbPU9/img/rectangle-17.svg"
                  />

                  <img
                    className="rectangle-7"
                    alt="Rectangle"
                    src="https://c.animaapp.com/iA1lbPU9/img/rectangle-19.svg"
                  />

                  <img
                    className="rectangle-8"
                    alt="Rectangle"
                    src="https://c.animaapp.com/iA1lbPU9/img/rectangle-18.svg"
                  />

                  <div className="ellipse-3" />

                  <div className="ellipse-4" />

                  <img
                    className="map"
                    alt="Map"
                    src="https://c.animaapp.com/iA1lbPU9/img/map-fill0-wght400-grad0-opsz48-1.svg"
                  />

                  <img
                    className="send"
                    alt="Send"
                    src="https://c.animaapp.com/iA1lbPU9/img/send-fill0-wght400-grad0-opsz48-1.svg"
                  />

                  <div className="frame-31">
                    <img
                      className="img-3"
                      alt="Where to vote"
                      src="https://c.animaapp.com/iA1lbPU9/img/where-to-vote-fill0-wght400-grad0-opsz48-1.svg"
                    />

                    <div className="text-wrapper-32">NOVA YORK</div>
                  </div>

                  <div className="frame-32">
                    <img
                      className="img-3"
                      alt="Where to vote"
                      src="https://c.animaapp.com/iA1lbPU9/img/where-to-vote-fill0-wght400-grad0-opsz48-1-1.svg"
                    />

                    <div className="text-wrapper-33">RIO DE JANEIRO</div>
                  </div>

                  <img
                    className="image"
                    alt="Image"
                    src="https://c.animaapp.com/iA1lbPU9/img/image-4@2x.png"
                  />
                </div>
              </div>

              <div className="frame-33">
                <div className="text-wrapper-34">
                  Porque escolher a Travelfy?
                </div>

                <p className="text-wrapper-35">
                  Lorem ipsum dolor sit amet consectetur. Aliquet malesuada
                  tellus viverra ultricies egestas sociis gravida sem. Enim elit
                  massa ullamcorper erat. Velit adipiscing odio tellus ultrices
                  euismod gravida eros. Sem posuere eget morbi non scelerisque.
                </p>
              </div>

              <div className="frame-34">
                <div className="frame-35">
                  <div className="ellipse-5" />

                  <img
                    className="explore"
                    alt="Explore"
                    src="https://c.animaapp.com/iA1lbPU9/img/explore-fill0-wght400-grad0-opsz48-1-2.svg"
                  />
                </div>

                <div className="text-wrapper-36">Certificada</div>

                <p className="text-wrapper-37">
                  Lorem ipsum dolor sit amet consectetur. Aliquet malesuada
                  tellus viverra ultricies egestas sociis gravida sem. Enim elit
                  massa ullamcorper erat.
                </p>
              </div>

              <img
                className="location"
                alt="Location"
                src="https://c.animaapp.com/iA1lbPU9/img/location.png"
              />

              <Frame className="frame-instance" property1="original" />
              <PropertyPrimRioWrapper
                className="frame-103"
                property1="prim-rio"
              />
            </div>

            <div className="overlap-5">
              <div className="frame-36">
                <div className="text-wrapper-34">Destinos Internacionais</div>

                <p className="text-wrapper-35">
                  Lorem ipsum dolor sit amet consectetur. Aliquet malesuada
                  tellus viverra ultricies egestas sociis gravida sem. Enim elit
                  massa ullamcorper erat.
                </p>
              </div>

              <div className="frame-37">
                <div className="frame-38">
                  <div className="ellipse-5" />

                  <img
                    className="explore"
                    alt="Explore"
                    src="https://c.animaapp.com/iA1lbPU9/img/explore-fill0-wght400-grad0-opsz48-1.svg"
                  />
                </div>

                <div className="text-wrapper-38">Múltiplos Destinos</div>

                <p className="text-wrapper-39">
                  Lorem ipsum dolor sit amet consectetur. Aliquet malesuada
                  tellus viverra ultricies egestas sociis gravida sem. Enim elit
                  massa ullamcorper erat.
                </p>
              </div>

              <img
                className="suitcase"
                alt="Suitcase"
                src="https://c.animaapp.com/iA1lbPU9/img/suitcase.png"
              />

              <div className="rectangle-9" />

              <img
                className="rectangle-10"
                alt="Rectangle"
                src="https://c.animaapp.com/iA1lbPU9/img/rectangle-24.svg"
              />

              <div className="frame-39">
                <div className="frame-40">
                  <div className="text-wrapper-40">Zurich</div>

                  <div className="frame-41">
                    <img
                      className="img-3"
                      alt="Location on"
                      src="https://c.animaapp.com/iA1lbPU9/img/location-on-fill0-wght400-grad0-opsz48-1-8.svg"
                    />

                    <div className="text-wrapper-41">SUIÇA</div>
                  </div>
                </div>

                <div className="frame-42">
                  <div className="frame-43">
                    <img
                      className="star-3"
                      alt="Star"
                      src="https://c.animaapp.com/iA1lbPU9/img/star-5-9.svg"
                    />

                    <p className="element-reviews-2">
                      <span className="text-wrapper-42">4,8 </span>

                      <span className="text-wrapper-43">(957 Reviews)</span>
                    </p>
                  </div>

                  <div className="frame-44">
                    <div className="text-wrapper-44">R$ 3.456,00</div>
                  </div>
                </div>
              </div>

              <div className="frame-45">
                <div className="text-wrapper-45">PROMO</div>
              </div>
            </div>

            <div className="frame-46">
              <div className="frame-35">
                <div className="ellipse-5" />

                <img
                  className="explore"
                  alt="Explore"
                  src="https://c.animaapp.com/iA1lbPU9/img/explore-fill0-wght400-grad0-opsz48-1-1.svg"
                />
              </div>

              <div className="text-wrapper-46">+ de 5.000 clientes</div>

              <p className="text-wrapper-37">
                Lorem ipsum dolor sit amet consectetur. Aliquet malesuada tellus
                viverra ultricies egestas sociis gravida sem. Enim elit massa
                ullamcorper erat.
              </p>
            </div>

            <div className="overlap-6">
              <img
                className="rectangle-11"
                alt="Rectangle"
                src="https://c.animaapp.com/iA1lbPU9/img/rectangle-26.svg"
              />

              <div className="frame-47">
                <div className="text-wrapper-40">LISBOA</div>

                <div className="frame-41">
                  <img
                    className="img-3"
                    alt="Location on"
                    src="https://c.animaapp.com/iA1lbPU9/img/location-on-fill0-wght400-grad0-opsz48-1-8.svg"
                  />

                  <div className="text-wrapper-41">PORTUGAL</div>
                </div>
              </div>

              <div className="frame-48">
                <div className="frame-43">
                  <img
                    className="star-3"
                    alt="Star"
                    src="https://c.animaapp.com/iA1lbPU9/img/star-5-9.svg"
                  />

                  <p className="element-reviews-2">
                    <span className="text-wrapper-42">4,8 </span>

                    <span className="text-wrapper-43">(957 Reviews)</span>
                  </p>
                </div>

                <div className="frame-44">
                  <div className="text-wrapper-44">R$ 2.766,00</div>
                </div>
              </div>
            </div>

            <Component
              className="component-1"
              locationOn="https://c.animaapp.com/iA1lbPU9/img/location-on-fill0-wght400-grad0-opsz48-1-8.svg"
              property1="original"
              rectangle="https://c.animaapp.com/iA1lbPU9/img/rectangle-28-1.svg"
            />
          </div>

          <Group
            className="group-6"
            locationOn="https://c.animaapp.com/iA1lbPU9/img/location-on-fill0-wght400-grad0-opsz48-1-8.svg"
            property1="opacidade-sim"
            rectangle="https://c.animaapp.com/iA1lbPU9/img/rectangle-30-1.svg"
            rectangleClassName="group-instance"
            star="/img/star-5.svg"
            starClassName="group-6-instance"
          />
        </div>

        <div className="frame-49">
          <div className="text-wrapper-34">Destinos Nacionais</div>

          <p className="text-wrapper-35">
            Lorem ipsum dolor sit amet consectetur. Aliquet malesuada tellus
            viverra ultricies egestas sociis gravida sem. Enim elit massa
            ullamcorper erat.
          </p>
        </div>

        <div className="frame-50">
          <p className="recomendados-por">
            Recomendados <br />
            por mais de 5.000
            <br />
            clientes!
          </p>

          <p className="text-wrapper-47">
            Lorem ipsum dolor sit amet consectetur. Aliquet malesuada tellus
            viverra ultricies egestas sociis gravida sem. Enim elit massa
            ullamcorper erat.
          </p>
        </div>

        <div className="overlap-7">
          <div className="rectangle-12" />

          <img
            className="rectangle-13"
            alt="Rectangle"
            src="https://c.animaapp.com/iA1lbPU9/img/rectangle-35.svg"
          />

          <div className="frame-51">
            <div className="frame-40">
              <div className="text-wrapper-40">Zurich</div>

              <div className="frame-41">
                <img
                  className="location-on-2"
                  alt="Location on"
                  src="/img/location-on-fill0-wght400-grad0-opsz48-1.svg"
                />

                <div className="text-wrapper-41">SUIÇA</div>
              </div>
            </div>

            <div className="frame-42">
              <div className="frame-43">
                <img
                  className="star-3"
                  alt="Star"
                  src="https://c.animaapp.com/iA1lbPU9/img/star-5-9.svg"
                />

                <p className="element-reviews-2">
                  <span className="text-wrapper-42">4,8 </span>

                  <span className="text-wrapper-43">(957 Reviews)</span>
                </p>
              </div>

              <div className="frame-44">
                <div className="text-wrapper-44">R$ 3.456,00</div>
              </div>
            </div>
          </div>

          <div className="frame-52">
            <div className="text-wrapper-45">PROMO</div>
          </div>
        </div>

        <div className="overlap-8">
          <img
            className="rectangle-11"
            alt="Rectangle"
            src="https://c.animaapp.com/iA1lbPU9/img/rectangle-36.svg"
          />

          <div className="frame-47">
            <div className="text-wrapper-40">GRAMADO</div>

            <div className="frame-41">
              <img
                className="img-3"
                alt="Location on"
                src="https://c.animaapp.com/iA1lbPU9/img/location-on-fill0-wght400-grad0-opsz48-1-6.svg"
              />

              <div className="text-wrapper-41">R. GRANDE SUL</div>
            </div>
          </div>

          <div className="frame-48">
            <div className="frame-43">
              <img
                className="star-3"
                alt="Star"
                src="https://c.animaapp.com/iA1lbPU9/img/star-5-9.svg"
              />

              <p className="element-reviews-2">
                <span className="text-wrapper-42">4,8 </span>

                <span className="text-wrapper-43">(957 Reviews)</span>
              </p>
            </div>

            <div className="frame-44">
              <div className="text-wrapper-44">R$ 2.766,00</div>
            </div>
          </div>
        </div>

        <div className="overlap-9">
          <img
            className="rectangle-11"
            alt="Rectangle"
            src="https://c.animaapp.com/iA1lbPU9/img/rectangle-37.svg"
          />

          <div className="frame-47">
            <div className="text-wrapper-40">RIO</div>

            <div className="frame-41">
              <img
                className="img-3"
                alt="Location on"
                src="https://c.animaapp.com/iA1lbPU9/img/location-on-fill0-wght400-grad0-opsz48-1-6.svg"
              />

              <div className="text-wrapper-41">RIO DE JANEIRO</div>
            </div>
          </div>

          <div className="frame-48">
            <div className="frame-43">
              <img
                className="star-3"
                alt="Star"
                src="https://c.animaapp.com/iA1lbPU9/img/star-5-9.svg"
              />

              <p className="element-reviews-2">
                <span className="text-wrapper-42">4,8 </span>

                <span className="text-wrapper-43">(957 Reviews)</span>
              </p>
            </div>

            <div className="frame-44">
              <div className="text-wrapper-44">R$ 4.477,00</div>
            </div>
          </div>
        </div>

        <div className="overlap-10">
          <div className="rectangle-14" />

          <img
            className="rectangle-11"
            alt="Rectangle"
            src="https://c.animaapp.com/iA1lbPU9/img/rectangle-39.svg"
          />

          <div className="frame-47">
            <div className="text-wrapper-40">MACEIÓ</div>

            <div className="frame-41">
              <img
                className="img-3"
                alt="Location on"
                src="https://c.animaapp.com/iA1lbPU9/img/location-on-fill0-wght400-grad0-opsz48-1-6.svg"
              />

              <div className="text-wrapper-41">ALAGOAS</div>
            </div>
          </div>

          <div className="frame-48">
            <div className="frame-43">
              <img
                className="star-3"
                alt="Star"
                src="https://c.animaapp.com/iA1lbPU9/img/star-5-9.svg"
              />

              <p className="element-reviews-2">
                <span className="text-wrapper-42">4,8 </span>

                <span className="text-wrapper-43">(957 Reviews)</span>
              </p>
            </div>

            <div className="frame-44">
              <div className="text-wrapper-44">R$ 4.477,00</div>
            </div>
          </div>

          <div className="frame-53">
            <div className="text-wrapper-45">PROMO</div>
          </div>
        </div>

        <div className="overlap-11">
          <div className="frame-54">
            <div className="rectangle-15" />

            <div className="frame-55">
              <div className="frame-56">
                <div className="frame-57">
                  <img
                    className="img-3"
                    alt="Where to vote"
                    src="https://c.animaapp.com/iA1lbPU9/img/where-to-vote-fill0-wght400-grad0-opsz48-1-2.svg"
                  />

                  <div className="text-wrapper-32">NOVA YORK</div>
                </div>

                <div className="frame-58">
                  <div className="text-wrapper-30">4,9</div>

                  <div className="frame-59">
                    <img
                      className="star-3"
                      alt="Star"
                      src="https://c.animaapp.com/iA1lbPU9/img/star-9.svg"
                    />

                    <img
                      className="star-3"
                      alt="Star"
                      src="https://c.animaapp.com/iA1lbPU9/img/star-9.svg"
                    />

                    <img
                      className="star-3"
                      alt="Star"
                      src="https://c.animaapp.com/iA1lbPU9/img/star-9.svg"
                    />

                    <img
                      className="star-3"
                      alt="Star"
                      src="https://c.animaapp.com/iA1lbPU9/img/star-9.svg"
                    />

                    <img
                      className="star-3"
                      alt="Star"
                      src="https://c.animaapp.com/iA1lbPU9/img/star-9.svg"
                    />
                  </div>
                </div>
              </div>

              <p className="text-wrapper-48">
                "Lorem ipsum dolor sit amet consectetur. Aliquet malesuada
                tellus viverra ultricies egestas sociis gravida sem. Enim elit
                massa ullamcorper erat. "
              </p>
            </div>
          </div>

          <img
            className="ellipse-6"
            alt="Ellipse"
            src="https://c.animaapp.com/iA1lbPU9/img/ellipse-13.svg"
          />
        </div>

        <div className="chevron-right-wrapper">
          <img
            className="chevron-right"
            alt="Chevron right"
            src="https://c.animaapp.com/iA1lbPU9/img/chevron-right-fill0-wght400-grad0-opsz48-1.svg"
          />
        </div>

        <div className="overlap-12">
          <div className="ellipse-7" />

          <img
            className="chevron-right-fill"
            alt="Chevron right"
            src="https://c.animaapp.com/iA1lbPU9/img/chevron-right-fill0-wght400-grad0-opsz48-2.svg"
          />
        </div>

        <div className="frame-60">
          <img
            className="image-2"
            alt="Image"
            src="https://c.animaapp.com/iA1lbPU9/img/image-6@2x.png"
          />

          <img
            className="image-3"
            alt="Image"
            src="https://c.animaapp.com/iA1lbPU9/img/image-10@2x.png"
          />

          <img
            className="image-4"
            alt="Image"
            src="https://c.animaapp.com/iA1lbPU9/img/image-8@2x.png"
          />

          <img
            className="image-5"
            alt="Image"
            src="https://c.animaapp.com/iA1lbPU9/img/image-9@2x.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Teste;